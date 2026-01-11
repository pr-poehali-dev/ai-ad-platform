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
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-7xl mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            if (tab.id === 'create') {
              return (
                <Button
                  key={tab.id}
                  variant="default"
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={onCreateClick}
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
                onClick={() => onTabChange(tab.id)}
              >
                <Icon name={tab.icon as any} size={22} />
                <span className="text-xs">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
