import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Privacy() {
  usePageTitle("Privacy");

  return (
    <PageContainer size="narrow" className="space-y-8">
      <PageHeader title="Privacy" />
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-text">
          Your privacy MATTERS
        </h2>
        <p className="leading-relaxed text-text-secondary">
          PDF Rodder prioritizes your privacy. Unlike other websites, we never
          ask for your name, email or any other personal information.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-text">
          No charges, FREE OF COST for all
        </h2>
        <p className="leading-relaxed text-text-secondary">
          You don't need to pay to use any services provided by PDF Rodder. We
          hope you understand this. You can buy me a coffee by clicking on
          Coffee option.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-text">
          No accounts, no personal details
        </h2>
        <p className="leading-relaxed text-text-secondary">
          PDF Rodder doesn't ask you to create an account to use our services.
          We are helping people to make their daily tasks easy for no cost.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-text">Your files are SAFE</h2>
        <p className="leading-relaxed text-text-secondary">
          Your files are safe and never stored anywhere in a database. The
          browser stores it locally for the conversion and once the session is
          expired, the files are deleted.
        </p>
      </section>
    </PageContainer>
  );
}
