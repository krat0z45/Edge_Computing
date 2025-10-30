export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Arquitecto Edge. Un proyecto para
          Arquitectura de Software.
        </p>
      </div>
    </footer>
  );
}
