import { convertNpmCommand } from "@/lib/convert-npm-command";
import { CodeBlockCommand } from "./code-block-command";

export function InstallBlock({ name }: { name: string }) {
  const npmCommand = `npx shadcn@latest add @remocn/${name}`;
  return (
    <div className="my-6">
      <CodeBlockCommand
        component={name}
        prompt={`Add the @remocn/${name} component to my project.`}
        {...convertNpmCommand(npmCommand)}
      />
    </div>
  );
}
