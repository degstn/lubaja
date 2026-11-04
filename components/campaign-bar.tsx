import { campaign } from "@/lib/site";

const endsAt = new Date(campaign.endsAt);
const endDate = endsAt.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "America/New_York",
});

// Hides the bar before it paints once the campaign is over, even if the site
// hasn't been rebuilt since.
const hideWhenOver = `if(Date.now()>${endsAt.getTime()})document.currentScript.parentElement.hidden=true`;

export function CampaignBar() {
  return (
    <a
      href={campaign.url}
      target="_blank"
      rel="noopener noreferrer"
      suppressHydrationWarning
      className="campaign-bar group stripes block bg-gold text-ink focus-visible:outline-ink focus-visible:-outline-offset-4"
    >
      <script dangerouslySetInnerHTML={{ __html: hideWhenOver }} />
      <span className="frame flex h-10 items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          <span className="eyebrow font-bold">Crowdfunding is live</span>
          <span className="hidden text-sm md:inline">{`Help us build CC11. Ends ${endDate}.`}</span>
        </span>
        <span className="headline flex items-center gap-2 text-sm">
          Give now
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </span>
    </a>
  );
}
