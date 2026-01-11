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
      className="overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in border-0 shadow-sm"
      onClick={onClick}
    >
      <div className="relative overflow-hidden group">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {listing.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-accent to-primary border-0 shadow-lg">
            <Icon name="Star" size={14} className="mr-1" />
            Топ
          </Badge>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-foreground line-clamp-2 text-base">{listing.title}</h3>
        </div>

        <p className="text-2xl font-bold text-primary mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{listing.price}</p>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Icon name="MapPin" size={15} />
          <span className="font-medium">{listing.location}</span>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          <Avatar className="w-9 h-9 ring-2 ring-primary/10">
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-xs font-semibold">
              {listing.seller.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold truncate">{listing.seller.name}</p>
              {listing.seller.verified && (
                <Icon name="BadgeCheck" className="text-accent flex-shrink-0" size={17} />
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={13} />
              <span className="text-xs font-semibold text-foreground">{listing.seller.rating}</span>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="hover:bg-red-50 hover:text-red-500 transition-colors">
            <Icon name="Heart" size={19} />
          </Button>
        </div>
      </div>
    </Card>
  );
}