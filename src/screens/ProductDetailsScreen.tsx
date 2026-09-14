import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { RootStackParamList } from '../navigation/types';
import { getProductById } from '../services/api';
import { colors } from '../theme/colors';
import { Product } from '../types/product';
import { getRequestErrorMessage } from '../utils/errorMessage';
import { getProductPresentation } from '../presentation/productPresentation';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const categoryLabels: Record<string, string> = {
  'mens-shirts': 'Camisas masculinas',
  'mens-shoes': 'Calçados masculinos',
  'mens-watches': 'Relógios masculinos',
  'womens-bags': 'Bolsas femininas',
  'womens-dresses': 'Vestidos femininos',
  'womens-jewellery': 'Joias femininas',
  'womens-shoes': 'Calçados femininos',
  'womens-watches': 'Relógios femininos',
};

export function ProductDetailsScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const loadProduct = useCallback(async () => {
    setLoading(true); setError('');
    try { setProduct(await getProductById(productId)); }
    catch (requestError) { setError(getRequestErrorMessage(requestError)); }
    finally { setLoading(false); }
  }, [productId]);
  useEffect(() => { loadProduct(); }, [loadProduct]);
  if (loading) return <LoadingState message="Carregando detalhes..." />;
  if (error || !product) return <ErrorState message={error || 'Produto não encontrado.'} onRetry={loadProduct} />;
  const finalPrice = product.price * (1 - product.discountPercentage / 100);
  const presentation = getProductPresentation(product);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}><Image source={{ uri: product.images[0] || product.thumbnail }} style={styles.image} resizeMode="contain" /><View style={styles.badge}><Text style={styles.badgeText}>-{product.discountPercentage.toFixed(1)}%</Text></View></View>
      <Text style={styles.category}>{(categoryLabels[product.category] ?? 'Produto do catálogo').toUpperCase()}</Text><Text style={styles.title}>{presentation.title}</Text>{product.brand && <Text style={styles.brand}>por {product.brand}</Text>}
      <View style={styles.priceRow}><Text style={styles.price}>US$ {finalPrice.toFixed(2)}</Text><Text style={styles.originalPrice}>US$ {product.price.toFixed(2)}</Text></View><Text style={styles.saving}>Você economiza US$ {(product.price - finalPrice).toFixed(2)}</Text>
      <View style={styles.divider} /><Text style={styles.sectionTitle}>Descrição</Text><Text style={styles.description}>{presentation.description}</Text>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}><Text style={styles.backButtonText}>Voltar ao catálogo</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, content: { padding: 20, paddingBottom: 36 }, imageContainer: { height: 330, borderRadius: 24, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', position: 'relative' }, image: { width: '100%', height: '100%' }, badge: { position: 'absolute', right: 14, top: 14, backgroundColor: colors.accent, paddingVertical: 7, paddingHorizontal: 11, borderRadius: 10 }, badgeText: { color: '#FFF', fontWeight: '900' },
  category: { color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginTop: 22 }, title: { color: colors.text, fontSize: 27, fontWeight: '900', lineHeight: 33, marginTop: 6 }, brand: { color: colors.muted, marginTop: 4 }, priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12, marginTop: 20 }, price: { color: colors.primary, fontSize: 27, fontWeight: '900' }, originalPrice: { color: colors.muted, fontSize: 15, textDecorationLine: 'line-through' }, saving: { color: colors.success, fontWeight: '700', marginTop: 4 }, divider: { height: 1, backgroundColor: colors.border, marginVertical: 22 }, sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800' }, description: { color: colors.muted, fontSize: 15, lineHeight: 24, marginTop: 9 }, backButton: { borderWidth: 1, borderColor: colors.primary, borderRadius: 14, alignItems: 'center', paddingVertical: 14, marginTop: 28 }, backButtonText: { color: colors.primary, fontWeight: '800' },
});
