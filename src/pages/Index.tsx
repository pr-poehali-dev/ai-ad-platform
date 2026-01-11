import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import ListingCard, { type Listing } from '@/components/ListingCard';
import CreateListingDialog from '@/components/CreateListingDialog';
import ListingDetailDialog from '@/components/ListingDetailDialog';
import BottomNavigation from '@/components/BottomNavigation';

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
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => setSelectedListing(listing)}
                />
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

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateClick={() => setCreateDialogOpen(true)}
      />

      <CreateListingDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      <ListingDetailDialog
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />
    </div>
  );
}
