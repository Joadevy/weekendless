"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Iprops = {
  placeholder: string;
  options: string[];
  label?: string;
  queryParam: string;
};

export function FilterSelect({
  placeholder,
  options,
  label,
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

  const handleSelect = (value: string) => {
    value.toLowerCase() === "all"
      ? router.push(`${pathname}?${createQueryString(queryParam, "")}`)
      : router.push(pathname + "?" + createQueryString(queryParam, value));
  };

  return (
    <Select
      defaultValue={searchParams.get(queryParam) ?? ""}
      onValueChange={(value) => handleSelect(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}

          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
