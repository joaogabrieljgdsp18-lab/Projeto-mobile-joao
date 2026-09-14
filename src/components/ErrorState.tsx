import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = { message: string; onRetry: () => void };

export function ErrorState({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>!</Text>
      <Text style={styles.title}>Algo deu errado</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Tentar novamente</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 },
  icon: { width: 48, height: 48, borderRadius: 24, textAlign: 'center', lineHeight: 48, backgroundColor: '#FEE2E2', color: colors.danger, fontSize: 25, fontWeight: '800' },
  title: { color: colors.text, fontSize: 19, fontWeight: '700', marginTop: 14 },
  message: { color: colors.muted, textAlign: 'center', marginTop: 6, lineHeight: 21 },
  button: { backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 22, paddingVertical: 12, marginTop: 20 },
  buttonText: { color: '#FFF', fontWeight: '700' },
});
