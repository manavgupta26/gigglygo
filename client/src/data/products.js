export const categories = [
  {
    id: 'dry-sheets',
    name: 'Baby Dry Sheets',
    emoji: '🛏️',
    color: '#B8D1C1',
    tagline: 'Waterproof & Skin-Friendly',
    description: 'Keep your baby comfortable and dry all night long. Waterproof, washable, and gentle on delicate skin.',
    features: ['Waterproof backing', 'Skin-friendly fabric', 'Lightweight', 'Easy to wash'],
    hasSizes: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    products: [
      { id: 'ds-1', name: 'Waterproof Baby Dry Sheet', price: 349, originalPrice: 499, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1559034461-61ce45377f02?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Super absorbent waterproof dry sheet with soft top layer.' },
      { id: 'ds-2', name: 'Reusable Dry Sheet', price: 299, originalPrice: 399, tag: 'Eco Pick', image: 'https://images.unsplash.com/photo-1559034461-61ce45377f02?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Eco-friendly reusable option, wash and reuse effortlessly.' },
      { id: 'ds-3', name: 'Soft Absorbent Sheet', price: 279, originalPrice: 379, tag: null, image: 'https://images.unsplash.com/photo-1559034461-61ce45377f02?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Feather-soft surface for maximum baby comfort.' },
      { id: 'ds-4', name: 'Printed Dry Sheet', price: 329, originalPrice: 449, tag: 'Cute!', image: 'https://images.unsplash.com/photo-1559034461-61ce45377f02?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Fun prints that make diaper time more joyful.' },
    ]
  },
  {
    id: 'rompers',
    name: 'Muslin Rompers & Sets',
    emoji: '👶',
    color: '#F59B90',
    tagline: 'Pure Cotton Comfort',
    description: 'Breathable pure cotton muslin rompers and sets for happy, comfortable newborns.',
    features: ['Pure cotton muslin', 'Breathable fabric', 'Soft for baby skin', 'Custom sizes & designs'],
    hasSizes: false,
    products: [
      { id: 'r-1', name: 'Muslin Romper', price: 449, originalPrice: 599, tag: 'Bestseller', image: "https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'Classic muslin romper — airy, soft, and oh-so-cute.' },
      { id: 'r-2', name: 'Baby Clothing Set', price: 699, originalPrice: 899, tag: 'Value Set', image: 'https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Complete top & bottom set in pure muslin cotton.' },
      { id: 'r-3', name: 'Half Sleeve Set', price: 549, originalPrice: 749, tag: null, image: 'https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Perfect for warm days — light and breathable.' },
      { id: 'r-4', name: 'Full Sleeve Set', price: 579, originalPrice: 779, tag: null, image: 'https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Cozy full-sleeve set for cooler evenings.' },
      { id: 'r-5', name: 'Printed Muslin Wear', price: 499, originalPrice: 649, tag: 'New', image: 'https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Adorable prints on premium muslin fabric.' },
    ]
  },
  {
    id: 'swaddles',
    name: 'Muslin Swaddles',
    emoji: '🤱',
    color: '#F2B50C',
    tagline: 'Wrap Them in Love',
    description: 'Multi-use cotton muslin swaddles — for swaddling, nursing, and everything in between.',
    features: ['Soft & breathable', 'Nursing use', 'Swaddling use', 'Custom prints & sizes'],
    hasSizes: false,
    products: [
      { id: 'sw-1', name: 'Cotton Muslin Swaddle', price: 399, originalPrice: 549, tag: 'Bestseller', image: "https://plus.unsplash.com/premium_photo-1755534835350-d8baf3db28fa?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'The classic — pure cotton muslin, endlessly useful.' },
      { id: 'sw-2', name: 'Printed Swaddle', price: 429, originalPrice: 579, tag: 'Cute!', image: "https://plus.unsplash.com/premium_photo-1755534835350-d8baf3db28fa?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'Gorgeous prints on breathable muslin.' },
      { id: 'sw-3', name: 'Lightweight Swaddle', price: 349, originalPrice: 499, tag: null, image: "https://plus.unsplash.com/premium_photo-1755534835350-d8baf3db28fa?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'Ultra-light for warm summer days.' },
      { id: 'sw-4', name: 'Multi-Use Swaddle Cloth', price: 379, originalPrice: 499, tag: 'Multi-use', image: "https://plus.unsplash.com/premium_photo-1755534835350-d8baf3db28fa?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'Use as swaddle, nursing cover, or burp cloth.' },
    ]
  },
  {
    id: 'hooded-wraps',
    name: 'Hooded Swaddle Wraps',
    emoji: '🧸',
    color: '#F39A16',
    tagline: 'Snug & Warm',
    description: 'Warm, cozy hooded swaddle wraps with soft knitted fabric for the coldest nights.',
    features: ['Warm inner lining', 'Soft knitted fabric', 'Easy wrap closures', 'Custom colors & styles'],
    hasSizes: false,
    products: [
      { id: 'hw-1', name: 'Hooded Wrap', price: 549, originalPrice: 749, tag: 'Bestseller', image: "https://images.unsplash.com/photo-1763089359104-f87d8adfd1ba?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'Adorable hooded wrap that keeps baby snug.' },
      { id: 'hw-2', name: 'Knitted Swaddle Wrap', price: 599, originalPrice: 799, tag: null, image: "https://images.unsplash.com/photo-1763089359104-f87d8adfd1ba?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'Handcrafted knit texture — warm and stylish.' },
      { id: 'hw-3', name: 'Winter Baby Wrap', price: 649, originalPrice: 849, tag: 'Winter', image: "https://images.unsplash.com/photo-1763089359104-f87d8adfd1ba?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'Extra warm lining for chilly winters.' },
      { id: 'hw-4', name: 'Cartoon-Themed Wrap', price: 579, originalPrice: 779, tag: 'Cute!', image: "https://images.unsplash.com/photo-1763089359104-f87d8adfd1ba?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: 'Fun cartoon characters babies love.' },
    ]
  },
  {
    id: 'blankets',
    name: 'Baby Blankets',
    emoji: '🌙',
    color: '#A7C2B1',
    tagline: 'Cozy Dreams',
    description: 'Soft polar fleece and printed blankets for warm, cozy sleep every single night.',
    features: ['Soft fabric', 'Cozy & warm', 'Multiple colors', 'Different patterns'],
    hasSizes: false,
    products: [
      { id: 'bl-1', name: 'Polar Fleece Blanket', price: 499, originalPrice: 649, tag: 'Bestseller', emoji: '⭐', desc: 'Ultra-soft polar fleece for dreamy naps.' },
      { id: 'bl-2', name: 'Printed Blanket', price: 449, originalPrice: 599, tag: 'Cute!', emoji: '🌟', desc: 'Vibrant prints that spark tiny imaginations.' },
      { id: 'bl-3', name: 'Soft Baby Blanket', price: 399, originalPrice: 549, tag: null, emoji: '💫', desc: 'Everyday soft blanket for strollers and cribs.' },
      { id: 'bl-4', name: 'Hooded Blanket', price: 549, originalPrice: 699, tag: 'New', emoji: '🐼', desc: 'Hood keeps baby\'s head warm during outings.' },
    ]
  },
  {
    id: 'mats',
    name: 'Baby Mats',
    emoji: '🏡',
    color: '#E7C9BC',
    tagline: 'Clean & Comfortable',
    description: 'Padded, waterproof and foldable baby mats for changing, play, and tummy time.',
    features: ['Padded surface', 'Easy to clean', 'Lightweight', 'Hygienic'],
    hasSizes: false,
    products: [
      { id: 'm-1', name: 'Baby Changing Mat', price: 449, originalPrice: 599, tag: 'Must Have', emoji: '🌺', desc: 'Padded and waterproof — makes every change easy.' },
      { id: 'm-2', name: 'Printed Baby Mat', price: 399, originalPrice: 549, tag: 'Cute!', emoji: '🎠', desc: 'Fun prints make tummy time a joy.' },
      { id: 'm-3', name: 'Foldable Mat', price: 499, originalPrice: 649, tag: 'Travel', emoji: '🧳', desc: 'Folds flat for on-the-go diaper changes.' },
      { id: 'm-4', name: 'Waterproof Mat', price: 429, originalPrice: 579, tag: null, emoji: '💦', desc: '100% waterproof surface, clean with one wipe.' },
    ]
  },
  {
    id: 'nest-bed',
    name: 'Baby Nest Bed',
    emoji: '🪺',
    color: '#B8D1C1',
    tagline: 'Safe Sleep Anywhere',
    description: 'Portable, cushioned baby nest beds for safe and comfortable sleep wherever you are.',
    features: ['Soft cotton fabric', 'Cushioned support', 'Portable', 'Multi-purpose use'],
    hasSizes: false,
    products: [
      { id: 'nb-1', name: 'Carry Nest', price: 799, originalPrice: 999, tag: 'Bestseller', emoji: '🌙', desc: 'Portable carry nest — baby\'s cozy home anywhere.' },
      { id: 'nb-2', name: 'Pillow Bed', price: 699, originalPrice: 899, tag: null, emoji: '🛸', desc: 'Soft pillow-style bed for supported sleep.' },
      { id: 'nb-3', name: 'Baby Mattress', price: 749, originalPrice: 949, tag: null, emoji: '💤', desc: 'Firm-yet-soft mattress for healthy spine support.' },
      { id: 'nb-4', name: 'Multifunction Baby Nest', price: 899, originalPrice: 1199, tag: 'Best Value', emoji: '🌈', desc: 'Use as nest, play lounger, or feeding support.' },
    ]
  },
];

export const getAllProducts = () => categories.flatMap(c => c.products.map(p => ({ ...p, category: c.id, categoryName: c.name, hasSizes: c.hasSizes, sizes: c.sizes })));