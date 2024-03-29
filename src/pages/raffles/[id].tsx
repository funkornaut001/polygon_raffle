import React from "react";
import { api } from "~/utils/api";
import Error from "next/error";
import { useRouter } from "next/router";
import Image from "next/image";

import Navbar from "~/components/Navbar";
import ExpandedRaffle from "~/components/ExpandedRaffle";

const raffle = () => {
  const router = useRouter();
  const postId = router.query.id as string;
  const { data, isLoading } = api.raffle.getRaffleById.useQuery(postId);

  if (isLoading) {
    return (
      <div className="">
        <Navbar />
        <div className="flex h-screen items-center justify-center bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-[#59368B] to-slate-900">
          <Image src="/rings.svg" alt="loader" width={200} height={200} />
        </div>
      </div>
    );
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-[#59368B] to-slate-900">
      <Navbar />
      {/* <div className="my-8" /> */}
      <ExpandedRaffle
        ticketSupply={data.ticketSupply}
        ticketPrice={data.ticketPrice}
        ticketsSold={data.ticketsSold}
        endDate={data.endDate}
        nftContractAddress={data.nftContractAddress}
        nftTokenId={data.nftTokenId}
        nftTokenURI={data.nftTokenURI}
        nftTokenName={data.nftTokenName}
        nftCollectionName={data.nftCollectionName}
        winnerWalletAddress={data.winnerWalletAddress}
        winnerPicked={data.winnerPicked}
        creatorWalletAddress={data.creatorWalletAddress}
        createdAt={data.createdAt}
        raffleID={data.id}
      />
    </div>
  );
};

export default raffle;
