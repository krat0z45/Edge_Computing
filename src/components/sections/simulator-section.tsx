import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';

const simulatorCode = `
// 1. Dispositivo de Borde (p. ej., una cámara de seguridad)
class DispositivoBorde {
  procesarFrame(frame) {
    // Realiza detección de objetos localmente en el dispositivo
    const objetos = this.detectarObjetos(frame);
    
    // Si se detecta una persona, envía una alerta de alta prioridad a la pasarela
    if (objetos.includes('persona')) {
      const alerta = { tipo: 'PERSONA_DETECTADA', timestamp: Date.now() };
      this.enviarAPasarela(alerta, { prioridad: 'alta' });
    }
  }
}

// 2. Pasarela de Borde (p. ej., servidor local en el edificio)
class PasarelaBorde {
  constructor() {
    this.bufferDatosDispositivo = [];
  }

  recibirDatos(datos) {
    if (datos.prioridad === 'alta') {
      // Reenvía inmediatamente las alertas críticas a la nube
      this.enviarANube(datos);
    } else {
      // Almacena en búfer los datos no críticos
      this.bufferDatosDispositivo.push(datos);
    }
  }
  
  // Periódicamente, agrega y envía datos por lotes
  procesarYReenviarLote() {
    if (this.bufferDatosDispositivo.length > 0) {
      const resumen = this.agregar(this.bufferDatosDispositivo);
      this.enviarANube({ tipo: 'RESUMEN_HORARIO', payload: resumen });
      this.bufferDatosDispositivo = []; // Limpiar búfer
    }
  }
}

// 3. Backend en la Nube
class ServicioNube {
  manejarDatos(datos) {
    if (datos.tipo === 'PERSONA_DETECTADA') {
      // Activa notificaciones de seguridad, almacena el evento
      this.activarAlertaSeguridad(datos);
    } else if (datos.tipo === 'RESUMEN_HORARIO') {
      // Almacena datos agregados para análisis a largo plazo
      this.almacenarParaAnaliticas(datos.payload);
    }
  }
}
`.trim();

export function SimulatorSection() {
  return (
    <section id="simulator" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              Simulador de Patrón Arquitectónico
            </CardTitle>
            <CardDescription>
              Un ejemplo de código simulado que ilustra el patrón "Red de Borde
              Jerárquica", donde el procesamiento se distribuye entre
              dispositivos, pasarelas y la nube.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Esta simulación demuestra cómo los diferentes niveles manejan los
              datos. El Dispositivo de Borde realiza un filtrado inicial, la
              Pasarela agrega datos y reenvía alertas críticas, y la Nube se
              encarga del almacenamiento a largo plazo y acciones complejas.
            </p>
            <CodeBlock>{simulatorCode}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
