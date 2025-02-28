import Image from "next/image";
import Hero from "./HeroSection/page";
import MinecraftFeatures from "./BelowHero/page";
import ServerStatus from "./RankVoteStatus/page";
import TopContributors from "./TopContributor/page";
import PlayerReviews from "./Reviews/page";
import JoinServerSection from "./ContactSection/page";

export default function Home() {
  return (
    <div>
      <Hero/>
      <MinecraftFeatures/>
      <ServerStatus/>
      <TopContributors/>
      <PlayerReviews/>
      <JoinServerSection/>
    </div>
  );
}
