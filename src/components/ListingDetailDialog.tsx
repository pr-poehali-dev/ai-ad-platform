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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {listing && (
          <>
            <div className="relative -mx-6 -mt-6">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-64 object-cover"
              />
              {listing.featured && (
                <Badge className="absolute top-4 left-4 bg-accent">
                  <Icon name="Star" size={14} className="mr-1" />
                  Топ объявление
                </Badge>
              )}
            </div>

            <div className="space-y-4 py-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
                <p className="text-3xl font-bold text-primary">{listing.price}</p>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="MapPin" size={18} />
                <span>{listing.location}</span>
              </div>

              <div className="bg-secondary/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {listing.seller.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{listing.seller.name}</h3>
                      {listing.seller.verified && (
                        <Icon name="BadgeCheck" className="text-accent" size={18} />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" className="text-yellow-500" size={14} />
                      <span className="text-sm font-semibold">{listing.seller.rating}</span>
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
  );
}
