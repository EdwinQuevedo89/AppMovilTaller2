import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, set } from 'firebase/database';

interface Post {
  id: string;
  email: string;
  opinion: string;
}

export const HomeScreen = () => {
  const [opinion, setOpinion] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user ? user.email : '';

  const database = getDatabase();
  const postsRef = ref(database, 'posts');

  useEffect(() => {
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedPosts: Post[] = [];
      for (let key in data) {
        loadedPosts.push({ id: key, email: data[key].email, opinion: data[key].opinion });
      }
      setPosts(loadedPosts);
    });
  }, []);

  const handleAddPost = async () => {
    if (opinion === '') {
      setErrorMessage('Por favor, escribe tu opinión.');
      setVisible(true);
      return;
    }
    if (email) {
      try {
        const newPostRef = push(postsRef);
        await set(newPostRef, { email, opinion });
        setSuccessMessage('Publicación agregada correctamente.');
        setSuccessVisible(true);
        
        // Agregar la nueva publicación al estado local
        setPosts((prevPosts) => [
          ...prevPosts,
          { id: newPostRef.key!, email, opinion },
        ]);

        // Limpiar el campo de texto
        setOpinion('');
      } catch (error) {
        setErrorMessage('Error al agregar la publicación.');
        setVisible(true);
      }
    } else {
      setErrorMessage('Usuario no autenticado.');
      setVisible(true);
    }
  };

  const onDismissSnackBar = () => {
    setVisible(false);
    setSuccessVisible(false);
  };

  return (
    <View style={styles.root}>
        
      <Text style={styles.text}>Bienvenido, {email}</Text>
      <TextInput
        label="Escribe tu opinión"
        mode='outlined'
        placeholder='Ingresa tu opinión sobre el ITSQMET'
        value={opinion}
        onChangeText={setOpinion}
        style={styles.inputs}
      />
      <Button
        mode="contained"
        onPress={handleAddPost}
        style={styles.buttons}
      >
        Agregar Publicación
      </Button>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text>{item.email}</Text>
            <Text>{item.opinion}</Text>
          </View>
        )}
      />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: '#b94018' }}
      >
        {errorMessage}
      </Snackbar>
      <Snackbar
        visible={successVisible}
        onDismiss={onDismissSnackBar}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: '#4c00ff' }}
      >
        {successMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        gap: 10,
        backgroundColor: '#c8d2d5',
        marginTop: 20
    },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  inputs: {
    marginBottom: 16,
  },
  buttons: {
    marginBottom: 16,
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
