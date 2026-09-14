import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authSlice';
import { colors } from '../theme/colors';

type Errors = { name?: string; email?: string; password?: string };

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleLogin() {
    const nextErrors: Errors = {};
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (cleanName.length < 2) nextErrors.name = 'Informe seu nome.';
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) nextErrors.email = 'Informe um e-mail válido.';
    if (password.length < 6) nextErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) dispatch(login({ name: cleanName, email: cleanEmail }));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.contentWidth}>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Preencha seus dados para acessar o catálogo.</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={[styles.card, styles.contentWidth]}>
            <Text style={styles.formTitle}>Entrar</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput style={[styles.input, errors.name && styles.inputError]} value={name} onChangeText={(value) => { setName(value); setErrors((old) => ({ ...old, name: undefined })); }} placeholder="Seu nome" placeholderTextColor="#94A3B8" autoCapitalize="words" />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>E-mail</Text>
            <TextInput style={[styles.input, errors.email && styles.inputError]} value={email} onChangeText={(value) => { setEmail(value); setErrors((old) => ({ ...old, email: undefined })); }} placeholder="voce@email.com" placeholderTextColor="#94A3B8" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Senha</Text>
            <View style={[styles.passwordRow, errors.password && styles.inputError]}>
              <TextInput style={styles.passwordInput} value={password} onChangeText={(value) => { setPassword(value); setErrors((old) => ({ ...old, password: undefined })); }} placeholder="Mínimo de 6 caracteres" placeholderTextColor="#94A3B8" secureTextEntry={!showPassword} onSubmitEditing={handleLogin} />
              <Pressable onPress={() => setShowPassword((value) => !value)} hitSlop={10}><Text style={styles.showText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text></Pressable>
            </View>
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleLogin}><Text style={styles.buttonText}>Entrar</Text></Pressable>
            <Text style={styles.helper}>Utilize qualquer e-mail válido e uma senha com pelo menos 6 caracteres.</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1769E0' },
  container: { flex: 1, backgroundColor: '#F4F6FA' },
  contentWidth: { width: '100%', maxWidth: 460, alignSelf: 'center' },
  header: { backgroundColor: '#1769E0', paddingHorizontal: 24, paddingTop: 48, paddingBottom: 54 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#DCEAFF', fontSize: 14, lineHeight: 21, marginTop: 8 },
  body: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 32 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 22, paddingTop: 26, paddingBottom: 24, marginTop: -30, borderWidth: 1, borderColor: '#E5EAF1', shadowColor: '#0F3266', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.12, shadowRadius: 14, elevation: 5 },
  formTitle: { color: '#1D2939', fontSize: 21, fontWeight: '800', marginBottom: 12 },
  label: { color: '#344054', fontSize: 13, fontWeight: '700', marginBottom: 7, marginTop: 13 },
  input: { height: 50, borderRadius: 9, borderWidth: 1, borderColor: '#CDD5DF', paddingHorizontal: 14, color: colors.text, backgroundColor: '#FFFFFF' },
  passwordRow: { height: 50, borderRadius: 9, borderWidth: 1, borderColor: '#CDD5DF', paddingLeft: 14, paddingRight: 12, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center' },
  passwordInput: { flex: 1, height: '100%', color: colors.text },
  showText: { color: '#1769E0', fontSize: 12, fontWeight: '700' },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: 12, marginTop: 5 },
  button: { height: 52, borderRadius: 9, backgroundColor: '#1769E0', alignItems: 'center', justifyContent: 'center', marginTop: 26 },
  buttonPressed: { backgroundColor: '#1056BA' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  helper: { color: '#667085', textAlign: 'center', fontSize: 11, lineHeight: 17, marginTop: 14 },
});
