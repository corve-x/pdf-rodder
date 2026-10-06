import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");

  return (
    <PageContainer size="narrow" className="space-y-6">
      <PageHeader
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <ButtonLink to="/">Back to tools</ButtonLink>
    </PageContainer>
  );
}
