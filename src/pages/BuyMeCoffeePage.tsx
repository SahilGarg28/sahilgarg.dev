import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FixedNavbar from "@/components/FixedNavbar";
import { buyMeCoffee } from "@/data/portfolio-data";
import { ArrowLeft, Coffee, ExternalLink } from "lucide-react";

export default function BuyMeCoffeePage() {
  const [qrFailed, setQrFailed] = useState(false);

  if (!buyMeCoffee.enabled) {
    return (
      <Layout>
        <FixedNavbar variant="page" />
        <div className="pt-[44px] min-h-screen flex items-center justify-center px-6">
          <p className="text-body text-muted-foreground">Tips are turned off for now.</p>
        </div>
      </Layout>
    );
  }

  const showQr = Boolean(buyMeCoffee.upiQrImage) && !qrFailed;

  return (
    <Layout>
      <FixedNavbar variant="page" />
      <div className="pt-[44px] min-h-screen">
        <div className="max-w-md mx-auto px-6 py-16 md:py-24 space-y-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-small text-muted-foreground hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </Link>

          <header className="space-y-4">
            <div className="flex justify-center">
              <Coffee size={32} className="text-[var(--color-primary)]" />
            </div>
            <h1 className="text-section">{buyMeCoffee.headline}</h1>
            <p className="text-body text-muted-foreground text-left">{buyMeCoffee.message}</p>
          </header>

          <div className="border border-border bg-card p-6 md:p-8 space-y-6">
            {showQr && (
              <figure className="space-y-3">
                <img
                  src={buyMeCoffee.upiQrImage}
                  alt="UPI QR code for tips"
                  className="mx-auto w-56 h-56 object-contain rounded-md border border-border bg-white p-2"
                  onError={() => setQrFailed(true)}
                />
                <figcaption className="text-small text-muted-foreground">
                  Scan with PhonePe, GPay, Paytm, or any UPI app
                </figcaption>
              </figure>
            )}

            {!showQr && buyMeCoffee.upiQrImage && (
              <p className="text-small text-muted-foreground">
                QR image unavailable. Check that{" "}
                <code className="text-foreground">public{buyMeCoffee.upiQrImage}</code> exists.
              </p>
            )}

            {buyMeCoffee.externalUrl && (
              <a
                href={buyMeCoffee.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full border border-border px-4 py-3 text-small uppercase tracking-[0.12em] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Tip via Buy Me a Coffee
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <p className="text-tiny text-muted-foreground">
            Tips are voluntary — thank you for the support.
          </p>
        </div>
      </div>
    </Layout>
  );
}
