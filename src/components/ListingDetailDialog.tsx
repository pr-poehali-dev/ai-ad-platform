import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { Listing } from './ListingCard';

type ListingDetailDialogProps = {
  listing: Listing | null;
  onClose: () => void;
};

export default function ListingDetailDialog({ listing, onClose }: ListingDetailDialogProps) {
  return (
    <Dialog open={!!listing} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in border-0 shadow-2xl">
        {listing && (
          <>
            <div className="relative -mx-6 -mt-6 overflow-hidden rounded-t-2xl">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {listing.featured && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-accent to-primary border-0 shadow-lg">
                  <Icon name="Star" size={14} className="mr-1" />
                  Топ объявление
                </Badge>
              )}
            </div>

            <div className="space-y-5 py-4">
              <div>
                <h2 className="text-3xl font-bold mb-3 tracking-tight">{listing.title}</h2>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{listing.price}</p>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="MapPin" size={16} className="text-primary" />
                </div>
                <span className="font-medium">{listing.location}</span>
              </div>

              <div className="bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-2xl p-5 border border-border/30">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16 ring-4 ring-primary/10">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold text-lg">
                      {listing.seller.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{listing.seller.name}</h3>
                      {listing.seller.verified && (
                        <Icon name="BadgeCheck" className="text-accent" size={20} />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="text-base font-bold">{listing.seller.rating}</span>
                      <span className="text-sm text-muted-foreground">(98 отзывов)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 shadow-lg shadow-primary/20" size="lg">
                    <Icon name="MessageCircle" className="mr-2" size={18} />
                    Написать
                  </Button>
                  <Button variant="outline" size="icon" className="h-11 w-11 hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition-colors">
                    <Icon name="Phone" size={18} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-11 w-11 hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors">
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

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/20">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="ShieldCheck" className="text-primary" size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Проверено ИИ</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Объявление прошло проверку на достоверность</p>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}