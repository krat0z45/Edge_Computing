import { cn } from '@/lib/utils';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <div className="my-4 rounded-lg bg-primary text-primary-foreground border border-accent/20 shadow-inner">
      <pre className={cn('p-4 overflow-x-auto', className)} {...props}>
        <code className="font-code text-sm">{children}</code>
      </pre>
    </div>
  );
}
