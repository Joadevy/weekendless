"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";

import { Input } from "./ui/input";

type Iprops = {
  placeholder: string;
  queryParam: string;
};

export function FilterInput({
  placeholder,

  queryParam,
}: Iprops) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value === "") params.delete(name);
      else params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase();

    router.push(`${pathname}?${createQueryString(queryParam, value)}`);
  };

  return (
    <Input
      defaultValue={searchParams.get(queryParam) ?? ""}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
