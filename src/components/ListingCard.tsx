import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

export type Listing = {
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

type ListingCardProps = {
  listing: Listing;
  onClick: () => void;
};

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
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
  );
}
