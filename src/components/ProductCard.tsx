import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../types/product';
import { colors } from '../theme/colors';
import { getProductPresentation } from '../presentation/productPresentation';

type Props = { product: Product; onPress: () => void };

export function ProductCard({ product, onPress }: Props) {
  const finalPrice = product.price * (1 - product.discountPercentage / 100);
  const presentation = getProductPresentation(product);

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{product.discountPercentage.toFixed(0)}%</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{presentation.title}</Text>
        <Text style={styles.originalPrice}>US$ {product.price.toFixed(2)}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>US$ {finalPrice.toFixed(2)}</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: '48.5%', backgroundColor: colors.surface, borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, marginBottom: 12 },
  pressed: { opacity: 0.78 },
  imageWrapper: { height: 145, backgroundColor: '#F1F5F9', position: 'relative' },
  image: { width: '100%', height: '100%' },
  discountBadge: { position: 'absolute', top: 9, right: 9, backgroundColor: colors.accent, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 4 },
  discountText: { color: '#FFF', fontWeight: '800', fontSize: 11 },
  content: { padding: 12 },
  title: { color: colors.text, fontWeight: '700', fontSize: 14, minHeight: 38, lineHeight: 19 },
  originalPrice: { color: colors.muted, fontSize: 11, textDecorationLine: 'line-through', marginTop: 7 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { color: colors.primary, fontWeight: '800', fontSize: 15 },
  arrow: { color: colors.primary, fontSize: 28, lineHeight: 28 },
});
