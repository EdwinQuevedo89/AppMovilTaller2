import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/style';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
    // Interfaz del formulario login
    interface FormLogin {
        email: string;
        password: string;
    }

    const navigation = useNavigation(); // Crear una constante para que funcione el text on press y envíe a la pantalla registrar

    // Estados del formulario login y mensajes de Snackbar
    const [form, setForm] = useState<FormLogin>({ email: '', password: '' });
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successVisible, setSuccessVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

    const handleSetValues = (key: keyof FormLogin, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleLoginUser = async () => {
        try {
            if (form.email === '' || form.password === '') {
                setErrorMessage('Por favor, completa todos los campos');
                setVisible(true);
            } else {
                const response = await signInWithEmailAndPassword(auth, form.email, form.password);
                console.log('Usuario autenticado:', response.user);
                setSuccessMessage('Ingreso exitoso');
                setSuccessVisible(true);
                // Navegar a HomeScreen después de una autenticación exitosa
                navigation.dispatch(CommonActions.navigate({ name: 'HomeScreen' }));
            }
        } catch (ex: any) {
            console.log('Error de inicio de sesión:', ex.message);
            setErrorMessage('Usuario y/o contraseña incorrecta');
            setVisible(true);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onDismissSnackBar = () => {
        setVisible(false);
        setSuccessVisible(false);
    };

    return (
        <View style={styles.root}>
            <ImageBackground
        source={{ uri: 'https://itsqmet.edu.ec/wp-content/uploads/2023/10/Unlogo-general-grande.png' }}
        style={styles.image}
      />
          
            <Text style={styles.text}>Inicia Sesión</Text>
            <TextInput
                label="Correo"
                mode='outlined'
                placeholder='Ingresa tu correo'
                keyboardType='email-address'
                value={form.email}
                onChangeText={(value) => handleSetValues('email', value)}
                style={styles.inputs}
            />
            <TextInput
                label="Contraseña"
                mode='outlined'
                placeholder='Ingresa tu contraseña'
                secureTextEntry={!showPassword} // Ocultar contraseña si showPassword es false
                right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                value={form.password}
                onChangeText={(value) => handleSetValues('password', value)}
                style={styles.inputs}
            />
            <Button
                mode="contained"
                onPress={handleLoginUser}
                style={styles.buttons}
            >
                Ingresar
            </Button>
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
            <Text style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'RegisterScreen' }))}>
                No tienes una cuenta? Registrate ahora
            </Text>
        </View>
    );
};
