import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Edge Computing Architecture.
        </p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">Acerca del Proyecto</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-2xl">
                Patrón Arquitectural: Edge Computing
              </SheetTitle>
              <SheetDescription>
                Un proyecto para la materia de Arquitectura de Software.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-4 text-sm">
              <div>
                <h3 className="font-semibold">Institución:</h3>
                <p className="text-muted-foreground">
                  Universidad Autónoma de Zacatecas (UAZ)
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Programa Académico:</h3>
                <p className="text-muted-foreground">Ingeniería de Software</p>
              </div>
              <div>
                <h3 className="font-semibold">Docente:</h3>
                <p className="text-muted-foreground">
                  Dra. Julieta G. Rodríguez Ruiz
                </p>
              </div>
              <div className="pt-4">
                <h3 className="font-semibold text-base mb-2">
                  Integrantes del Equipo:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Cristian Adrian Esparza Cortes</li>
                  <li>Diego Ricardo Esparza Cortes</li>
                  <li>Gerardo Alejando Carrillo Aguirre</li>
                </ul>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </footer>
  );
}