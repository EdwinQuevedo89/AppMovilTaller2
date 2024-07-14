import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { styles } from './theme/style';

// Interfaz del formulario de registro
interface FormRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = () => {
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleSetValues = (key: keyof FormRegister, value: string) => {
    if (key === 'password') {
      // Validar la coincidencia de contraseña
      if (formRegister.confirmPassword !== value) {
        setErrorMessage('Las contraseñas no coinciden');
        setVisible(true);
      } else {
        setErrorMessage('');
        setVisible(false);
      }
    } else if (key === 'confirmPassword') {
      // Validar la coincidencia de contraseña
      if (formRegister.password !== value) {
        setErrorMessage('Las contraseñas no coinciden');
        setVisible(true);
      } else {
        setErrorMessage('');
        setVisible(false);
      }
    }
    setFormRegister({ ...formRegister, [key]: value });
  };

  const handleRegisterUser = async () => {
    const { email, password } = formRegister;
    if (!email || !password || password !== formRegister.confirmPassword) {
      setErrorMessage('Por favor, complete todos los campos y asegúrese de que las contraseñas coincidan.');
      setVisible(true);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password,
      );
      // Registro exitoso
      setSuccessMessage('¡Registro exitoso!');
      setSuccessVisible(true);
      console.log(response);
    } catch (ex) {
      console.log(ex);
      setErrorMessage('Error al registrar. Por favor, intente nuevamente.');
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
      <Text style={styles.text}>
        Regístrate...
      </Text>
      <TextInput
        label="Correo"
        mode='outlined'
        placeholder='Ingresa tu correo'
        keyboardType='email-address'
        onChangeText={(value) => handleSetValues('email', value)}
        style={styles.inputs}
      />
      <TextInput
        label="Contraseña"
        mode='outlined'
        placeholder='Ingresa tu contraseña'
        secureTextEntry={!showPassword} // Ocultar contraseña si showPassword es false
        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
        onChangeText={(value) => handleSetValues('password', value)}
        style={styles.inputs}
      />
      <TextInput
        label="Confirmar Contraseña"
        mode='outlined'
        placeholder='Confirma tu contraseña'
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
        onChangeText={(value) => handleSetValues('confirmPassword', value)}
        style={styles.inputs}
      />
      <Button
        mode="contained"
        onPress={handleRegisterUser}
        style={styles.buttons}
      >
        Registrar
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: '#4c00ff' }}
      >
        {errorMessage}
      </Snackbar>
      <Snackbar
        visible={successVisible}
        onDismiss={onDismissSnackBar}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: '#b94018' }}
      >
        {successMessage}
      </Snackbar>
    </View>
  );
};

export default RegisterScreen;
