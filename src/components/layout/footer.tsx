import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';

const teamMembers = [
  {
    name: 'Cristian Adrian Esparza Cortes',
    image: PlaceHolderImages.find((img) => img.id === 'cristian-esparza'),
  },
  {
    name: 'Diego Ricardo Esparza Cortes',
    image: PlaceHolderImages.find((img) => img.id === 'diego-esparza'),
  },
  {
    name: 'Gerardo Alejando Carrillo Aguirre',
    image: PlaceHolderImages.find((img) => img.id === 'gerardo-carrillo'),
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Edge Computing Architecture.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">Acerca del Proyecto</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Patrón Arquitectural: Edge Computing
              </DialogTitle>
              <DialogDescription>
                Un proyecto para la materia de Arquitectura de Software.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Institución:</h3>
                  <p className="text-muted-foreground">
                    Universidad Autónoma de Zacatecas (UAZ)
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Programa Académico:</h3>
                  <p className="text-muted-foreground">
                    Ingeniería de Software
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Docente:</h3>
                  <p className="text-muted-foreground">
                    Dra. Julieta G. Rodríguez Ruiz
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-base mb-2">
                  Integrantes del Equipo:
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {teamMembers.map((member) => (
                    <Card key={member.name} className="bg-card/50">
                      <CardContent className="p-4 flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          {member.image && (
                            <AvatarImage
                              src={member.image.imageUrl}
                              alt={member.name}
                              data-ai-hint={member.image.imageHint}
                            />
                          )}
                          <AvatarFallback>
                            {member.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-card-foreground">
                          {member.name}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
}
