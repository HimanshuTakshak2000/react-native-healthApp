import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    Modal,
    TextInput,
  } from 'react-native';
  import React, {useCallback, useEffect, useState} from 'react';
  import {StackNavigationProp} from '@react-navigation/stack';
  import {App} from '../Navigation/RootParaList';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {baseUrl} from '../utils/baseUrl';
  import {useIsFocused} from '@react-navigation/native';
  
  type HomeScreenProps = {
    navigation: StackNavigationProp<App, 'Home'>;
  };
  
  type noteType = {
    _id: string;
    title: string;
    description: string;
    postedById: string;
    postedByName: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export default function HomeScreen({navigation}: HomeScreenProps) {
    const [notes, setNotes] = useState<noteType[]>([]);
    const [isModelVisible, setisModelVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [isTitleError, setIsTitleError] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [noteId, setNoteId] = useState<string>('');
    const [isdescriptionError, setIsdescriptionError] = useState<boolean>(false);
    const [isUpdatePressed, setIsUpdatePressed] = useState<boolean>(false);
  
    const isFocused = useIsFocused();
    useEffect(() => {
      getAllNotes();
    },[isFocused]);
  
    const getAllNotes = async () => {
      const user = await AsyncStorage.getItem('User');
      if (user) {
        const parsedUser = JSON.parse(user);
        const userId = parsedUser._id;
        const name = parsedUser.name;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
  
        const res = await fetch(`${baseUrl}api/notes/getNotes?userId=${userId}`, {
          headers,
          method: 'GET',
        });
        const data = await res.json();
        setNotes(data);
      }
    };
    const eachItemPress = (item: noteType, type: number) => {
      if (type == 2) {
        setIsUpdatePressed(true);
        setNoteId(item._id);
      }
      setTitle(item.title);
      setisModelVisible(true);
      setDescription(item.description);
    };
    const deleteNotes = async (notesId: string) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
  
      const res = await fetch(`${baseUrl}api/notes/deleteNotes/${notesId}`, {
        headers,
        method: 'DELETE',
      });
      await res.json();
      ToastAndroid.show('Note Deleted Successfully!!', ToastAndroid.LONG);
      setisModelVisible(false);
      getAllNotes();
    };
  
    const handleTitleChange = (text: string) => {
      setTitle(text);
      if (text.length == 0) {
        setIsTitleError(true);
      } else {
        setIsTitleError(false);
      }
    };
  
    const handledescriptionChange = (text: string) => {
      setDescription(text);
      if (text.length == 0) {
        setIsdescriptionError(true);
      } else {
        setIsdescriptionError(false);
      }
    };
  
    const handleUpdateNotes = () => {
      if (title.length == 0 && description.length == 0) {
        setIsTitleError(true);
        setIsdescriptionError(true);
      } else if (title.length == 0) {
        setIsTitleError(true);
        setIsdescriptionError(false);
      } else if (description.length == 0) {
        setIsTitleError(false);
        setIsdescriptionError(true);
      } else {
        setIsTitleError(false);
        setIsdescriptionError(false);
        updateNotesApi();
      }
    };
  
    const updateNotesApi = async () => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const body = {title, description};
      const res = await fetch(`${baseUrl}api/notes/updateNotes/${noteId}`, {
        headers,
        method: 'PUT',
        body: JSON.stringify(body),
      });
  
      await res.json();
  
      ToastAndroid.show('Notes Updated Successfully!!', ToastAndroid.LONG);
      setisModelVisible(false);
      setIsUpdatePressed(false);
      getAllNotes();
    };
    const renderItem = (item: noteType) => {
    
      return (
        <View style={styles.notesItem}>
          <TouchableOpacity onPress={() => eachItemPress(item, 1)} style={{justifyContent:'center'}}>
            <Text style={{color:'black', fontSize:16, fontWeight:'800', marginBottom:8}}>{item.title}</Text>
            <Text style={{color:'black', fontSize:14, fontWeight:'400'}}>
              {item.description.length < 30
                ? item.description
                : `${item.description.substring(0, 30)}...`}
            </Text>
          </TouchableOpacity>
  
          <View style={{justifyContent:'space-between'}}>
            <Text onPress={() => eachItemPress(item, 2)} style={{color:'blue', fontSize:16, fontWeight:'600'}}>Update</Text>
            <Text onPress={() => deleteNotes(item._id)} style={{color:'red', fontSize:16, fontWeight:'600'}}>Delete</Text>
          </View>
        </View>
      );
    };
    return (
      <>
        <View style={styles.container}>
          <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
          <View style={styles.header}>
            <Text style={styles.title}>Notes App</Text>
          </View>
          {notes.length > 0 ? (
            <FlatList data={notes} renderItem={({item}) => renderItem(item)} />
          ) : (
            <View style={styles.noDataView}>
              <Text style={styles.title}>Notes Not Found</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.btn}
            // onPress={() => navigation.navigate('')}
            >
            <Text style={styles.btnText}>Create Note</Text>
          </TouchableOpacity>
        </View>
  
        <Modal visible={isModelVisible} onRequestClose={() => setisModelVisible(false)} >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'gray',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 300,
                justifyContent: 'center',
              }}>
              <TextInput
                style={styles.input}
                placeholder="Enter Notes Title"
                onChangeText={t => handleTitleChange(t)}
                value={title}
                editable = {isUpdatePressed}
              />
              {isTitleError && (
                <View style={{marginVertical: 5, marginLeft: 22}}>
                  <Text style={{color: 'red', fontWeight: '400', fontSize: 14}}>
                    Enter Title for notes
                  </Text>
                </View>
              )}
              <TextInput
                style={[styles.input,{height:100, textAlignVertical:'top'}]}
                placeholder="Enter Notes Description"
                multiline
                onChangeText={t => handledescriptionChange(t)}
                value={description}
                editable = {isUpdatePressed}
              />
              {isdescriptionError && (
                <View style={{marginVertical: 5, marginLeft: 22}}>
                  <Text style={{color: 'red', fontWeight: '400', fontSize: 14}}>
                    Enter Description for notes
                  </Text>
                </View>
              )}
              {isUpdatePressed ? (
                <TouchableOpacity
                  style={styles.btnModel}
                  onPress={() => handleUpdateNotes()}>
                  <Text style={styles.btnModelText}>Update Note</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    style={styles.btnModel}
                    onPress={() => setisModelVisible(false)}>
                    <Text style={styles.btnModelText}>Close</Text>
                  </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      width: '100%',
      height: 60,
      backgroundColor: 'white',
      elevation: 5,
      justifyContent: 'center',
      paddingLeft: 20,
      // alignItems:"center",
    },
    title: {
      color: 'black',
      fontSize: 18,
      fontWeight: '600',
    },
    btn: {
      position: 'absolute',
      width: 200,
      height: 50,
      borderRadius: 30,
      right: 20,
      bottom: 20,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    notesItem: {
      width: '90%',
      height: 80,
      borderWidth: 1,
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    noDataView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '90%',
      height: 45,
      borderWidth: 1,
      borderColor: 'black',
      alignSelf: 'center',
      marginTop: 20,
      borderRadius: 20,
      paddingLeft: 20,
    },
    btnModel: {
      width: '90%',
      height: 45,
      backgroundColor: 'black',
      borderRadius: 10,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    btnModelText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
  });
  