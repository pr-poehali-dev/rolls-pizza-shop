import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size?: string
  category: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  sizes?: string[]
  isNew?: boolean
}

const products: Product[] = [
  // Пиццы
  {
    id: 1,
    name: 'Маргарита',
    description: 'Классическая пицца с томатным соусом, моцареллой и базиликом',
    price: 449,
    category: 'pizza',
    sizes: ['25см', '30см', '35см'],
    isNew: false
  },
  {
    id: 2,
    name: 'Пепперони',
    description: 'Пицца с острой пепперони, томатным соусом и моцареллой',
    price: 549,
    category: 'pizza',
    sizes: ['25см', '30см', '35см'],
    isNew: true
  },
  {
    id: 3,
    name: 'Четыре сыра',
    description: 'Пицца с четырьмя видами сыра: моцарелла, пармезан, горгонзола, чеддер',
    price: 649,
    category: 'pizza',
    sizes: ['25см', '30см', '35см'],
    isNew: false
  },
  {
    id: 4,
    name: 'Мясная',
    description: 'Пицца с говядиной, ветчиной, пепперони и курицей',
    price: 699,
    category: 'pizza',
    sizes: ['25см', '30см', '35см'],
    isNew: false
  },
  // Роллы
  {
    id: 5,
    name: 'Калифорния',
    description: 'Ролл с лососем, авокадо, огурцом и икрой масаго',
    price: 350,
    category: 'rolls',
    isNew: false
  },
  {
    id: 6,
    name: 'Филадельфия',
    description: 'Классический ролл с лососем и сливочным сыром',
    price: 420,
    category: 'rolls',
    isNew: true
  },
  {
    id: 7,
    name: 'Дракон',
    description: 'Ролл с угрем, авокадо и специальным соусом',
    price: 380,
    category: 'rolls',
    isNew: false
  },
  {
    id: 8,
    name: 'Спайси лосось',
    description: 'Острый ролл с лососем, огурцом и острым соусом',
    price: 390,
    category: 'rolls',
    isNew: true
  },
  // Напитки
  {
    id: 9,
    name: 'Кока-Кола',
    description: 'Классическая кока-кола 0.5л',
    price: 120,
    category: 'drinks',
    isNew: false
  },
  {
    id: 10,
    name: 'Сок апельсиновый',
    description: 'Свежевыжатый апельсиновый сок 0.3л',
    price: 180,
    category: 'drinks',
    isNew: false
  },
  // Десерты
  {
    id: 11,
    name: 'Тирамису',
    description: 'Классический итальянский десерт',
    price: 250,
    category: 'desserts',
    isNew: false
  },
  {
    id: 12,
    name: 'Чизкейк',
    description: 'Нежный чизкейк с ягодным соусом',
    price: 220,
    category: 'desserts',
    isNew: true
  }
]

export default function Index() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartBounce, setCartBounce] = useState(false)

  const categories = [
    { id: 'all', name: 'Все', icon: 'Grid3X3' },
    { id: 'pizza', name: 'Пиццы', icon: 'Pizza' },
    { id: 'rolls', name: 'Роллы', icon: 'Fish' },
    { id: 'drinks', name: 'Напитки', icon: 'Coffee' },
    { id: 'desserts', name: 'Десерты', icon: 'Cookie' }
  ]

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  const addToCart = (product: Product, size?: string) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size,
      category: product.category
    }
    
    const existingItem = cart.find(item => 
      item.id === product.id && item.size === size
    )
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, cartItem])
    }

    // Анимация корзины
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 600)
  }

  const removeFromCart = (id: number, size?: string) => {
    setCart(cart.filter(item => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id: number, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size)
    } else {
      setCart(cart.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getProductQuantity = (productId: number, size?: string) => {
    const item = cart.find(item => item.id === productId && item.size === size)
    return item ? item.quantity : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">🍕 ПиццаРолл</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Доставка</a>
                <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Оплата</a>
                <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Контакты</a>
                <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Акции</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <div>Доставка: 33 мин • 4.9 ⭐</div>
              </div>
              <Button 
                onClick={() => setCartOpen(true)}
                className={`bg-orange-600 hover:bg-orange-700 relative transition-all duration-300 ${
                  cartBounce ? 'animate-bounce-cart' : ''
                }`}
              >
                <Icon name="ShoppingCart" size={16} />
                <span className="ml-2">Корзина</span>
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-fade-in">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-r from-green-400 to-green-500 text-white">
              <CardContent className="p-6">
                <Icon name="Clock" size={32} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-sm opacity-90">От 30 минут</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
              <CardContent className="p-6">
                <Icon name="Pizza" size={32} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2">Свежая пицца</h3>
                <p className="text-sm opacity-90">Из печи</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-red-400 to-red-500 text-white">
              <CardContent className="p-6">
                <Icon name="Percent" size={32} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2">Акции</h3>
                <p className="text-sm opacity-90">Скидки до 30%</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
              <CardContent className="p-6">
                <Icon name="Fish" size={32} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2">Суши</h3>
                <p className="text-sm opacity-90">Свежие роллы</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white">
              <CardContent className="p-6">
                <Icon name="Gift" size={32} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2">Бонусы</h3>
                <p className="text-sm opacity-90">При заказе</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Popular Items */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Часто заказывают</h2>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Icon name="Pizza" size={24} className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Пепперони</h3>
                <p className="text-gray-600">от {products.find(p => p.name === 'Пепперони')?.price}₽</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Fish" size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Филадельфия</h3>
                <p className="text-gray-600">от {products.find(p => p.name === 'Филадельфия')?.price}₽</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon name="Coffee" size={24} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">Кока-Кола</h3>
                <p className="text-gray-600">от {products.find(p => p.name === 'Кока-Кола')?.price}₽</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={`transition-all duration-200 ${
                activeCategory === category.id 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'border-orange-200 hover:bg-orange-50'
              }`}
            >
              <Icon name={category.icon as any} size={16} className="mr-2" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center mb-4 relative">
                  <div className="text-6xl">
                    {product.category === 'pizza' && '🍕'}
                    {product.category === 'rolls' && '🍣'}
                    {product.category === 'drinks' && '🥤'}
                    {product.category === 'desserts' && '🍰'}
                  </div>
                  {product.isNew && (
                    <Badge className="absolute top-2 right-2 bg-pink-500 animate-fade-in">
                      новинка
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">от {product.price}₽</span>
                    {product.sizes ? (
                      <div className="flex flex-col space-y-1">
                        {product.sizes.map((size) => {
                          const quantity = getProductQuantity(product.id, size)
                          return (
                            <div key={size} className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 w-8">{size}</span>
                              {quantity > 0 ? (
                                <div className="flex items-center space-x-1 animate-fade-in">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(product.id, size, quantity - 1)}
                                    className="w-6 h-6 p-0 text-xs hover:bg-red-50"
                                  >
                                    -
                                  </Button>
                                  <span className="text-xs font-medium w-4 text-center">{quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(product.id, size, quantity + 1)}
                                    className="w-6 h-6 p-0 text-xs hover:bg-green-50"
                                  >
                                    +
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => addToCart(product, size)}
                                  className="bg-orange-600 hover:bg-orange-700 text-xs px-2 h-6 transition-all duration-200 hover:scale-110"
                                >
                                  Добавить
                                </Button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {getProductQuantity(product.id) > 0 ? (
                          <div className="flex items-center space-x-2 animate-fade-in">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(product.id, undefined, getProductQuantity(product.id) - 1)}
                              className="w-8 h-8 p-0 hover:bg-red-50"
                            >
                              -
                            </Button>
                            <span className="font-medium w-6 text-center">{getProductQuantity(product.id)}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(product.id, undefined, getProductQuantity(product.id) + 1)}
                              className="w-8 h-8 p-0 hover:bg-green-50"
                            >
                              +
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => addToCart(product)}
                            className="bg-orange-600 hover:bg-orange-700 transition-all duration-200 hover:scale-110"
                            size="sm"
                          >
                            Добавить
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in">
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl animate-slide-in">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Корзина</h2>
                <Button variant="ghost" onClick={() => setCartOpen(false)} className="hover:bg-gray-100">
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="ShoppingCart" size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-2xl">
                        {item.category === 'pizza' && '🍕'}
                        {item.category === 'rolls' && '🍣'}
                        {item.category === 'drinks' && '🥤'}
                        {item.category === 'desserts' && '🍰'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        {item.size && <p className="text-sm text-gray-600">{item.size}</p>}
                        <p className="text-sm text-gray-600">{item.price}₽</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="hover:bg-red-50"
                        >
                          -
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="hover:bg-green-50"
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="hover:bg-red-50 text-red-600"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Итого:</span>
                  <span className="text-xl font-bold text-orange-600">{getTotalPrice()}₽</span>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-200 hover:scale-105">
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🍕 ПиццаРолл</h3>
              <p className="text-gray-300">Лучшая пицца и роллы в городе с доставкой за 30 минут</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <p className="text-gray-300">📞 +7 (999) 123-45-67</p>
              <p className="text-gray-300">📧 info@pizzaroll.ru</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Доставка</h4>
              <p className="text-gray-300">🚗 Бесплатная от 1000₽</p>
              <p className="text-gray-300">⏰ Ежедневно 10:00 - 23:00</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Акции</h4>
              <p className="text-gray-300">🎁 Скидка 20% на первый заказ</p>
              <p className="text-gray-300">🍕 2 пиццы = 3-я в подарок</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}