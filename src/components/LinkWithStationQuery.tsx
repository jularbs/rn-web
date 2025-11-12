"use client";
import Link from "next/link";
import { useSelectedStationContext } from "@/context/StationWrapper";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;

interface LinkWithStationQueryProps extends Omit<LinkProps, 'href'> {
  href: string | { pathname: string; query?: Record<string, string | undefined> };
}

export function LinkWithStationQuery({ href, ...props }: LinkWithStationQueryProps) {
  const { selectedStation } = useSelectedStationContext();

  // Build href with station query parameter
  const buildHref = () => {
    // If selectedStation is default or doesn't exist, don't add query param
    if (!selectedStation || selectedStation.default || !selectedStation.slug) {
      return href;
    }

    // If href is a string
    if (typeof href === "string") {
      return {
        pathname: href,
        query: { station: selectedStation.slug },
      };
    }

    // If href is an object
    return {
      pathname: href.pathname,
      query: {
        ...href.query,
        station: selectedStation.slug,
      },
    };
  };

  return <Link href={buildHref()} {...props} />;
}
