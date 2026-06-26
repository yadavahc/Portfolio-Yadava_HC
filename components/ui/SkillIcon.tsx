"use client";

import * as Si from "react-icons/si";
import * as Tb from "react-icons/tb";
import * as Fa from "react-icons/fa";
import type { IconType } from "react-icons";

const map: Record<string, IconType> = {
  ...(Si as Record<string, IconType>),
  ...(Tb as Record<string, IconType>),
  ...(Fa as Record<string, IconType>),
};

export default function SkillIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Tb.TbCode;
  return <Icon className={className} />;
}
