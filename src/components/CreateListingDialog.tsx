import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type CreateListingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateListingDialog({ open, onOpenChange }: CreateListingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
}
