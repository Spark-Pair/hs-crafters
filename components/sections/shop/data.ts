export type Product = {
  id: string
  name: string
  category: string
  price: string
  image: string
  images: string[]
  description: string
  details: string[]
  materials: string
  dimensions: string
  care: string
}

export const categories = ['All Pieces', 'Ceramics', 'Woodwork', 'Textiles', 'Limited']

export const products: Product[] = [
  {
    id: 'ridge-clay-vase',
    name: 'Ridge Clay Vase',
    category: 'Ceramics',
    price: '$64',
    image:
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f501?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f501?q=80&w=1400',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1400',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400',
    ],
    description:
      'A hand-thrown stoneware vase with a soft matte glaze and ridged silhouette for fresh stems or dried arrangements.',
    details: [
      'Wheel-thrown in small studio batches',
      'Single-fired with mineral glaze finish',
      'Each piece has natural variation in tone and shape',
    ],
    materials: 'Stoneware clay, mineral glaze',
    dimensions: 'Height 24 cm, width 12 cm',
    care: 'Hand wash only. Avoid abrasive scrubbing.',
  },
  {
    id: 'hand-carved-oak-board',
    name: 'Hand-Carved Oak Board',
    category: 'Woodwork',
    price: '$92',
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1400',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1400',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400',
    ],
    description:
      'Solid oak serving board carved by hand and sealed with natural oil for kitchen prep and table presentation.',
    details: [
      'Food-safe finish with rounded edges',
      'Cut and carved from responsibly sourced oak',
      'Designed for serving and light prep use',
    ],
    materials: 'Solid oak wood, natural oil blend',
    dimensions: 'Length 42 cm, width 20 cm, thickness 2 cm',
    care: 'Wipe clean and re-oil monthly.',
  },
  {
    id: 'loomed-linen-throw',
    name: 'Loomed Linen Throw',
    category: 'Textiles',
    price: '$78',
    image:
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1400',
      'https://images.unsplash.com/photo-1616627781431-23aa46db5146?q=80&w=1400',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1400',
    ],
    description:
      'Breathable linen throw with subtle texture and hand-finished edges, made for layering in living or sleeping spaces.',
    details: [
      'Medium-weight weave for all seasons',
      'Softens naturally with every wash',
      'Hand-fringed edge detailing',
    ],
    materials: '100% linen',
    dimensions: '130 cm x 180 cm',
    care: 'Machine wash cold, line dry.',
  },
  {
    id: 'stoneware-mug-pair',
    name: 'Stoneware Mug Pair',
    category: 'Ceramics',
    price: '$48',
    image:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1400',
      'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=1400',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1400',
    ],
    description:
      'Set of two hand-thrown mugs designed for daily coffee and tea rituals with a comfortable rounded handle.',
    details: [
      'Balanced weight for daily handling',
      'Subtle speckled glaze effect',
      'Sold as a matching pair',
    ],
    materials: 'Stoneware clay, food-safe glaze',
    dimensions: '300 ml each',
    care: 'Dishwasher safe on gentle cycle.',
  },
  {
    id: 'ash-wood-lamp-base',
    name: 'Ash Wood Lamp Base',
    category: 'Woodwork',
    price: '$136',
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1400',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1400',
      'https://images.unsplash.com/photo-1594808899047-a4cfa4929b7d?q=80&w=1400',
    ],
    description:
      'Turned ash wood base with warm grain character and a minimal profile for modern and rustic interiors.',
    details: [
      'Hand-sanded and oil-finished',
      'Fits standard E27 socket assemblies',
      'Cord set included',
    ],
    materials: 'Ash wood, matte oil finish',
    dimensions: 'Height 28 cm, base diameter 14 cm',
    care: 'Dust with dry cloth. Keep away from moisture.',
  },
  {
    id: 'knotted-cotton-runner',
    name: 'Knotted Cotton Runner',
    category: 'Textiles',
    price: '$55',
    image:
      'https://images.unsplash.com/photo-1616627781431-23aa46db5146?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1616627781431-23aa46db5146?q=80&w=1400',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1400',
    ],
    description:
      'Textured cotton table runner hand-knotted at the ends, bringing softness and craft detail to shared spaces.',
    details: [
      'Dense weave with tactile surface',
      'Neutral tone for layered table settings',
      'Finished with hand-knotted tassels',
    ],
    materials: 'Cotton',
    dimensions: '40 cm x 160 cm',
    care: 'Cold wash, lay flat to dry.',
  },
  {
    id: 'edition-no-7-vessel',
    name: 'Edition No. 7 Vessel',
    category: 'Limited',
    price: '$180',
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400',
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f501?q=80&w=1400',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1400',
    ],
    description:
      'A numbered collectible vessel, sculpted and signed in a highly limited studio release.',
    details: [
      'Edition of 25, individually numbered',
      'Hand-shaped profile with one-of-one surface variation',
      'Comes with studio authenticity card',
    ],
    materials: 'Stoneware, iron-rich glaze',
    dimensions: 'Height 30 cm, width 14 cm',
    care: 'Display piece. Spot clean with soft cloth.',
  },
]

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}
