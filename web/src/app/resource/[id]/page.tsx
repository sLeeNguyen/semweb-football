import { fboClasses } from "@/actions/config";
import { querier } from "@/actions/querier";
import { notFound, redirect } from "next/navigation";

export default async function Resource({ params }: { params: { id: string } }) {
  const type = await querier.resourceType(params.id);

  if (type === fboClasses.Player) {
    return redirect(`/player/${params.id}`);
  }
  if (type === fboClasses.Area) {
    return redirect(`/continent/${params.id}`);
  }
  if (type === fboClasses.Country) {
    return redirect(`/country/${params.id}`);
  }
  if (type === fboClasses.League) {
    return redirect(`/league/${params.id}`);
  }
  if (type === fboClasses.LeagueSeason) {
    return redirect(`/league-season/${params.id}`);
  }
  if (type === fboClasses.NationalTeam) {
    return redirect(`/national-team/${params.id}`);
  }

  return notFound();
}
