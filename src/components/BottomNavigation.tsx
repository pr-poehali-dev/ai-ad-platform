import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type BottomNavigationProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreateClick: () => void;
};

export default function BottomNavigation({ activeTab, onTabChange, onCreateClick }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'search', icon: 'Search', label: 'Поиск' },
    { id: 'create', icon: 'PlusCircle', label: 'Разместить' },
    { id: 'favorites', icon: 'Heart', label: 'Избранное' },
    { id: 'messages', icon: 'MessageCircle', label: 'Чаты' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-glass border-t border-border/50 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-2 py-3 safe-area-inset-bottom">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            if (tab.id === 'create') {
              return (
                <Button
                  key={tab.id}
                  variant="default"
                  size="icon"
                  className="h-14 w-14 rounded-full shadow-xl shadow-primary/30 bg-gradient-to-br from-primary to-accent hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={onCreateClick}
                >
                  <Icon name={tab.icon as any} size={26} />
                </Button>
              );
            }

            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 transition-all duration-300 ${
                  isActive 
                    ? 'text-primary font-semibold' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                <div className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                  <Icon name={tab.icon as any} size={22} />
                </div>
                <span className="text-[10px] tracking-tight">{tab.label}</span>
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}