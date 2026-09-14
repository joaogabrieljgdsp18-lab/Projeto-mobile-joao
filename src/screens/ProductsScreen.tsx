import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductCard } from '../components/ProductCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { getProductsByCategory } from '../services/api';
import { logout } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { colors } from '../theme/colors';
import { Product } from '../types/product';
import { RootStackParamList } from '../navigation/types';
import { getRequestErrorMessage } from '../utils/errorMessage';

type Gender = 'male' | 'female';
type Category = { value: string; label: string };

const categories: Record<Gender, Category[]> = {
  male: [{ value: 'mens-shirts', label: 'Camisas' }, { value: 'mens-shoes', label: 'Calçados' }, { value: 'mens-watches', label: 'Relógios' }],
  female: [{ value: 'womens-bags', label: 'Bolsas' }, { value: 'womens-dresses', label: 'Vestidos' }, { value: 'womens-jewellery', label: 'Joias' }, { value: 'womens-shoes', label: 'Calçados' }, { value: 'womens-watches', label: 'Relógios' }],
};
type Props = NativeStackScreenProps<RootStackParamList, 'Products'>;

export function ProductsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [gender, setGender] = useState<Gender>('male');
  const [category, setCategory] = useState<string>(categories.male[0].value);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError('');
    try { setProducts(await getProductsByCategory(category)); }
    catch (requestError) { setError(getRequestErrorMessage(requestError)); }
    finally { setLoading(false); setRefreshing(false); }
  }, [category]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  function selectGender(nextGender: Gender) {
    setGender(nextGender);
    setCategory(categories[nextGender][0].value);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View><Text style={styles.eyebrow}>OLÁ, {user?.name.split(' ')[0].toUpperCase()}</Text><Text style={styles.heading}>Encontre seu estilo</Text></View>
        <Pressable style={styles.logoutButton} onPress={() => dispatch(logout())}><Text style={styles.logoutText}>Sair</Text></Pressable>
      </View>
      <View style={styles.genderTabs}>
        {(['male', 'female'] as Gender[]).map((item) => <Pressable key={item} style={[styles.genderTab, gender === item && styles.genderTabActive]} onPress={() => selectGender(item)}><Text style={[styles.genderText, gender === item && styles.genderTextActive]}>{item === 'male' ? 'Masculino' : 'Feminino'}</Text></Pressable>)}
      </View>
      <FlatList horizontal data={categories[gender]} keyExtractor={(item) => item.value} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories} style={styles.categoriesList} renderItem={({ item }) => <Pressable style={[styles.category, category === item.value && styles.categoryActive]} onPress={() => setCategory(item.value)}><Text style={[styles.categoryText, category === item.value && styles.categoryTextActive]} numberOfLines={1}>{item.label}</Text></Pressable>} />
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={() => loadProducts()} /> : (
        <FlatList key={gender} data={products} keyExtractor={(item) => item.id.toString()} numColumns={2} columnWrapperStyle={styles.columns} contentContainerStyle={styles.products} showsVerticalScrollIndicator={false} refreshing={refreshing} onRefresh={() => loadProducts(true)} ListHeaderComponent={<Text style={styles.resultCount}>{products.length} produtos encontrados</Text>} ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>} renderItem={({ item }) => <ProductCard product={item} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} />} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 16 }, eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1 }, heading: { color: colors.text, fontSize: 24, fontWeight: '900', marginTop: 2 },
  logoutButton: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 }, logoutText: { color: colors.danger, fontWeight: '700' }, genderTabs: { flexDirection: 'row', backgroundColor: '#E9E5F5', borderRadius: 14, padding: 4, marginHorizontal: 20 }, genderTab: { flex: 1, alignItems: 'center', paddingVertical: 11, borderRadius: 11 }, genderTabActive: { backgroundColor: colors.surface }, genderText: { color: colors.muted, fontWeight: '700' }, genderTextActive: { color: colors.primary },
  categoriesList: { flexGrow: 0, marginTop: 15, minHeight: 52 }, categories: { alignItems: 'center', paddingLeft: 20, paddingRight: 20, gap: 8, paddingTop: 2, paddingBottom: 12 }, category: { flexShrink: 0, minHeight: 38, borderRadius: 18, paddingHorizontal: 16, paddingVertical: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, categoryActive: { backgroundColor: colors.primary, borderColor: colors.primary }, categoryText: { flexShrink: 0, color: colors.muted, fontWeight: '600', fontSize: 13, lineHeight: 18 }, categoryTextActive: { color: '#FFF' }, products: { paddingHorizontal: 20, paddingBottom: 30 }, columns: { justifyContent: 'space-between' }, resultCount: { color: colors.muted, fontSize: 12, marginTop: 6, marginBottom: 11 }, empty: { color: colors.muted, textAlign: 'center', marginTop: 50 },
});
