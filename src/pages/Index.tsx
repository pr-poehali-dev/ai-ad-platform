import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type Listing = {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
    avatar: string;
  };
  category: string;
  featured: boolean;
};

const categories = [
  { name: 'Все категории', icon: 'Grid3x3' },
  { name: 'Электроника', icon: 'Smartphone' },
  { name: 'Недвижимость', icon: 'Home' },
  { name: 'Транспорт', icon: 'Car' },
  { name: 'Работа', icon: 'Briefcase' },
  { name: 'Услуги', icon: 'Wrench' },
];

const mockListings: Listing[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max 256GB',
    price: '89 900 ₽',
    location: 'Москва, Центр',
    image: 'https://images.unsplash.com/photo-1696446702061-cbd8e2c9c2f7?w=400',
    seller: { name: 'Александр К.', rating: 4.9, verified: true, avatar: 'АК' },
    category: 'Электроника',
    featured: true
  },
  {
    id: 2,
    title: '2-к квартира, 65 м²',
    price: '12 500 000 ₽',
    location: 'Санкт-Петербург',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    seller: { name: 'Мария С.', rating: 5.0, verified: true, avatar: 'МС' },
    category: 'Недвижимость',
    featured: true
  },
  {
    id: 3,
    title: 'Toyota Camry 2020',
    price: '2 450 000 ₽',
    location: 'Казань',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
    seller: { name: 'Дмитрий П.', rating: 4.8, verified: true, avatar: 'ДП' },
    category: 'Транспорт',
    featured: false
  },
  {
    id: 4,
    title: 'MacBook Pro M3 14"',
    price: '189 900 ₽',
    location: 'Москва, Юго-Запад',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    seller: { name: 'Елена В.', rating: 4.7, verified: true, avatar: 'ЕВ' },
    category: 'Электроника',
    featured: false
  },
  {
    id: 5,
    title: 'Ремонт квартир под ключ',
    price: 'от 5 000 ₽/м²',
    location: 'Москва',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400',
    seller: { name: 'Строй Мастер', rating: 4.9, verified: true, avatar: 'СМ' },
    category: 'Услуги',
    featured: false
  },
  {
    id: 6,
    title: 'Менеджер по продажам',
    price: '80 000 ₽/мес',
    location: 'Новосибирск',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
    seller: { name: 'ООО "Альфа"', rating: 4.6, verified: true, avatar: 'АЛ' },
    category: 'Работа',
    featured: false
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все категории' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Megaphone" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-xl font-bold text-foreground">Объявления</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={22} />
            </Button>
          </div>

          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск объявлений..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {activeTab === 'home' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? 'default' : 'outline'}
                className="flex-shrink-0 gap-2"
                onClick={() => setSelectedCategory(cat.name)}
              >
                <Icon name={cat.icon as any} size={18} />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Рекомендации для вас</h2>
              <Badge variant="secondary" className="gap-1">
                <Icon name="Sparkles" size={14} />
                ИИ подбор
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map((listing) => (
                <Card 
                  key={listing.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedListing(listing)}
                >
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    {listing.featured && (
                      <Badge className="absolute top-3 left-3 bg-accent">
                        <Icon name="Star" size={14} className="mr-1" />
                        Топ
                      </Badge>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-2">{listing.title}</h3>
                    </div>

                    <p className="text-2xl font-bold text-primary mb-2">{listing.price}</p>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <Icon name="MapPin" size={14} />
                      {listing.location}
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {listing.seller.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-medium truncate">{listing.seller.name}</p>
                          {listing.seller.verified && (
                            <Icon name="BadgeCheck" className="text-accent flex-shrink-0" size={16} />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" className="text-yellow-500" size={12} />
                          <span className="text-xs text-muted-foreground">{listing.seller.rating}</span>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Icon name="Heart" size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      )}

      {activeTab === 'search' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-6">Поиск и фильтры</h2>
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Расширенный поиск в разработке</p>
          </div>
        </main>
      )}

      {activeTab === 'favorites' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-6">Избранное</h2>
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="Heart" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Сохраняйте понравившиеся объявления</p>
          </div>
        </main>
      )}

      {activeTab === 'messages' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-6">Сообщения</h2>
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Здесь будут ваши диалоги с продавцами</p>
          </div>
        </main>
      )}

      {activeTab === 'profile' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-6 mb-6 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">ИП</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">Иван Петров</h2>
                    <Icon name="BadgeCheck" className="text-accent" size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Star" className="text-yellow-500" size={16} />
                    <span className="font-semibold">4.9</span>
                    <span className="text-sm">(127 отзывов)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-sm text-muted-foreground">Объявления</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-sm text-muted-foreground">Продано</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Рейтинг</p>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <Icon name="Settings" className="mr-2" size={18} />
                Настройки профиля
              </Button>
            </div>

            <div className="space-y-2">
              {[
                { icon: 'Package', label: 'Мои объявления', count: 24 },
                { icon: 'MessageCircle', label: 'Сообщения', count: 3 },
                { icon: 'Heart', label: 'Избранное', count: 12 },
                { icon: 'Clock', label: 'История', count: null },
                { icon: 'Shield', label: 'Безопасность', count: null },
                { icon: 'Bell', label: 'Уведомления', count: null },
              ].map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  className="w-full justify-between h-14"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon as any} size={20} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count && (
                      <Badge variant="secondary">{item.count}</Badge>
                    )}
                    <Icon name="ChevronRight" size={18} />
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </main>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="max-w-7xl mx-auto px-2 py-2">
          <div className="flex items-center justify-around">
            {[
              { id: 'home', icon: 'Home', label: 'Главная' },
              { id: 'search', icon: 'Search', label: 'Поиск' },
              { id: 'create', icon: 'PlusCircle', label: 'Разместить' },
              { id: 'favorites', icon: 'Heart', label: 'Избранное' },
              { id: 'messages', icon: 'MessageCircle', label: 'Чаты' },
              { id: 'profile', icon: 'User', label: 'Профиль' },
            ].map((tab) => {
              if (tab.id === 'create') {
                return (
                  <Button
                    key={tab.id}
                    variant="default"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={() => setCreateDialogOpen(true)}
                  >
                    <Icon name={tab.icon as any} size={24} />
                  </Button>
                );
              }

              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                    activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon name={tab.icon as any} size={22} />
                  <span className="text-xs">{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-primary" size={24} />
              Разместить объявление
            </DialogTitle>
            <DialogDescription>
              ИИ поможет создать привлекательное объявление за 60 секунд
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Категория</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Электроника</SelectItem>
                  <SelectItem value="realty">Недвижимость</SelectItem>
                  <SelectItem value="transport">Транспорт</SelectItem>
                  <SelectItem value="jobs">Работа</SelectItem>
                  <SelectItem value="services">Услуги</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Название</label>
              <Input placeholder="Например: iPhone 15 Pro Max 256GB" />
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Icon name="Sparkles" size={12} />
                ИИ предложит оптимальное название
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Описание</label>
              <Textarea placeholder="Опишите товар или услугу" rows={4} />
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Icon name="Sparkles" size={12} />
                ИИ улучшит текст и добавит ключевые детали
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Цена</label>
              <Input type="number" placeholder="0" />
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Icon name="TrendingUp" size={12} />
                ИИ подскажет рыночную цену
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Фото</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">Загрузите фото</p>
                <p className="text-xs text-muted-foreground">ИИ автоматически улучшит качество</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              <Icon name="Check" className="mr-2" size={18} />
              Опубликовать объявление
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedListing && (
            <>
              <div className="relative -mx-6 -mt-6">
                <img
                  src={selectedListing.image}
                  alt={selectedListing.title}
                  className="w-full h-64 object-cover"
                />
                {selectedListing.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent">
                    <Icon name="Star" size={14} className="mr-1" />
                    Топ объявление
                  </Badge>
                )}
              </div>

              <div className="space-y-4 py-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedListing.title}</h2>
                  <p className="text-3xl font-bold text-primary">{selectedListing.price}</p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={18} />
                  <span>{selectedListing.location}</span>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedListing.seller.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{selectedListing.seller.name}</h3>
                        {selectedListing.seller.verified && (
                          <Icon name="BadgeCheck" className="text-accent" size={18} />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" className="text-yellow-500" size={14} />
                        <span className="text-sm font-semibold">{selectedListing.seller.rating}</span>
                        <span className="text-sm text-muted-foreground">(98 отзывов)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="lg">
                      <Icon name="MessageCircle" className="mr-2" size={18} />
                      Написать
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11">
                      <Icon name="Phone" size={18} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11">
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Описание</h3>
                  <p className="text-muted-foreground">
                    В отличном состоянии, все документы в порядке. Проверено сервисной службой.
                    Дополнительная информация по запросу.
                  </p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <Icon name="ShieldCheck" className="text-primary" size={20} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Проверено ИИ</p>
                    <p className="text-xs text-muted-foreground">Объявление прошло проверку на достоверность</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
