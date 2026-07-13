"use client";

import { Badge, Button, ButtonLink } from "@/components/ui/primitives";
import { searchSpeciesCatalogue, species, taxonomyGroups } from "@/lib/data/taxonomy";
import { useMemo, useState } from "react";

const steps = ["Species", "Details", "Extras", "Publish"] as const;

function needsFormDetail(groupId?: string, commonName?: string) {
  if (!groupId) return false;
  const morphGroups = new Set([
    "g-rainbowfish",
    "g-aus-natives",
    "g-discus",
    "g-angelfish",
    "g-bettas",
    "g-goldfish",
    "g-cichlids",
  ]);
  if (morphGroups.has(groupId)) return true;
  const name = (commonName ?? "").toLowerCase();
  return (
    name.includes("rainbow") ||
    name.includes("blue-eye") ||
    name.includes("blue eye") ||
    name.includes("discus") ||
    name.includes("angel") ||
    name.includes("oscar") ||
    name.includes("ramirezi") ||
    name.includes("betta")
  );
}

export default function NewListingPage() {
  const [step, setStep] = useState(0);
  const [speciesId, setSpeciesId] = useState("");
  const [speciesQuery, setSpeciesQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [listingType, setListingType] = useState<"for_sale" | "rehoming">("for_sale");
  const [localAck, setLocalAck] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(10);
  const [description, setDescription] = useState("");
  const [locality, setLocality] = useState("");
  const [optional, setOptional] = useState({
    gh: "",
    kh: "",
    diet: "",
    tank: "",
    compatibility: "",
    breeding: "",
  });

  const selected = species.find((s) => s.id === speciesId);
  const localityRequired = needsFormDetail(selected?.groupId, selected?.commonName);

  const filteredSpecies = useMemo(() => {
    // Don't dump the full catalogue — require search or group so nothing looks pre-picked
    if (!speciesQuery.trim() && !groupFilter) return [];
    let results = searchSpeciesCatalogue(speciesQuery);
    if (groupFilter) {
      results = results.filter((s) => s.groupId === groupFilter);
    }
    return results.slice(0, 100);
  }, [speciesQuery, groupFilter]);

  const completeness = useMemo(() => {
    let score = 40;
    if (locality.trim()) score += 10;
    if (optional.gh) score += 5;
    if (optional.kh) score += 5;
    if (optional.diet) score += 10;
    if (optional.tank) score += 10;
    if (optional.compatibility) score += 10;
    if (optional.breeding) score += 10;
    return Math.min(score, 100);
  }, [optional, locality]);

  const canProceedSpecies =
    !!selected &&
    selected.tradeStatus !== "prohibited" &&
    (selected.tradeStatus !== "local_only" || localAck);

  const canProceedDetails =
    quantity >= 1 &&
    price >= 0 &&
    description.trim().length > 0 &&
    (!localityRequired || locality.trim().length > 0);

  const listingTitle = selected
    ? locality.trim()
      ? `${selected.commonName} — ${locality.trim()}`
      : selected.commonName
    : "";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-extrabold text-navy">Create listing</h1>
      <p className="mt-2 text-muted">
        Fish & livestock — 1 credit on publish. For discus, angelfish, rainbows, blue-eyes,
        bettas, goldfish and many cichlids, pick the exact form and confirm variety / morph /
        locality on the next step.
      </p>

      <div className="mt-6 flex gap-2">
        {steps.map((label, i) => (
          <div
            key={label}
            className={`flex-1 rounded-lg px-2 py-2 text-center text-xs font-bold ${
              i === step ? "bg-orange text-white" : i < step ? "bg-navy text-white" : "bg-sand text-muted"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-white p-6">
        {step === 0 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-navy">
              Species catalogue · {species.filter((s) => s.approved).length} ready to list
            </p>
            <p className="text-sm text-muted">
              Search or pick a group first — nothing is selected until you tap a species.
            </p>

            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-navy">Search species</span>
              <input
                type="search"
                value={speciesQuery}
                onChange={(e) => {
                  setSpeciesQuery(e.target.value);
                  setSpeciesId("");
                  setLocalAck(false);
                  setLocality("");
                }}
                placeholder="e.g. rainbow, blue-eye, Goyder, trifasciata, neon"
                className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-navy">Browse by group</span>
              <select
                className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
                value={groupFilter}
                onChange={(e) => {
                  setGroupFilter(e.target.value);
                  setSpeciesId("");
                  setLocalAck(false);
                  setLocality("");
                }}
              >
                <option value="">Choose a group…</option>
                {taxonomyGroups
                  .filter((g) => g.section === "fish" || g.section === "plants")
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
              </select>
            </label>

            {!speciesQuery.trim() && !groupFilter ? (
              <div className="rounded-xl border border-dashed border-[color:var(--line)] bg-foam px-4 py-10 text-center text-sm text-muted">
                Start typing a name or choose a group (Discus, Angelfish, Rainbowfish, Bettas,
                Goldfish & Koi) to see named forms.
              </div>
            ) : (
              <div className="max-h-80 overflow-auto rounded-xl border border-[color:var(--line)] bg-foam">
                {filteredSpecies.length === 0 ? (
                  <p className="p-4 text-sm text-muted">No species match. Try another search.</p>
                ) : (
                  <ul className="divide-y divide-[color:var(--line)]">
                    {filteredSpecies.map((s) => {
                      const group = taxonomyGroups.find((g) => g.id === s.groupId);
                      const active = speciesId === s.id;
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setSpeciesId(s.id);
                              setLocalAck(false);
                              // If catalogue name already includes a locality, prefill editable field
                              const dash = s.commonName.indexOf(" - ");
                              setLocality(dash > 0 ? s.commonName.slice(dash + 3) : "");
                            }}
                            className={`flex w-full flex-col items-start px-4 py-3 text-left transition-colors ${
                              active
                                ? "border-l-4 border-l-orange bg-white"
                                : "border-l-4 border-l-transparent hover:bg-white/70"
                            }`}
                          >
                            <span className="font-semibold text-navy">{s.commonName}</span>
                            <span className="text-sm italic text-muted">{s.scientificName}</span>
                            <span className="mt-1 text-xs font-semibold text-muted">
                              {group?.name}
                              {s.tradeStatus === "local_only" ? " · Local stock only" : ""}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}

            {selected ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sand px-4 py-3 text-sm text-navy">
                <p>
                  Selected: <span className="font-bold">{selected.commonName}</span>{" "}
                  <span className="italic text-muted">({selected.scientificName})</span>
                </p>
                <button
                  type="button"
                  className="font-semibold text-orange hover:underline"
                  onClick={() => {
                    setSpeciesId("");
                    setLocalAck(false);
                    setLocality("");
                  }}
                >
                  Clear
                </button>
              </div>
            ) : (
              <p className="text-sm text-muted">No species selected yet.</p>
            )}

            {selected?.tradeStatus === "local_only" ? (
              <div className="rounded-xl bg-warning/10 p-4 text-sm text-warning">
                <p className="font-bold">Local stock only</p>
                <p className="mt-1">{selected.tradeNotes}</p>
                <label className="mt-3 flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={localAck}
                    onChange={(e) => setLocalAck(e.target.checked)}
                    className="mt-1 accent-orange"
                  />
                  <span>I confirm this stock is from existing local Australian lines.</span>
                </label>
              </div>
            ) : null}
            {selected?.tradeStatus === "prohibited" ? (
              <p className="rounded-xl bg-danger/10 p-4 text-sm text-danger">
                This species is prohibited under Australian law and cannot be listed.
              </p>
            ) : null}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-xl bg-sand px-4 py-3 text-sm text-navy">
              Listing as: <span className="font-bold">{listingTitle || selected?.commonName}</span>
            </div>

            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-navy">
                Variety / morph / locality / strain
                {localityRequired ? " (required)" : " (optional)"}
              </span>
              <input
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder={
                  localityRequired
                    ? "e.g. Blue Diamond, Koi Angel, Goyder River, Halfmoon Copper, Oranda Red Cap"
                    : "e.g. Long-fin, Albino, F1 wild-caught"
                }
                className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
              />
              <span className="mt-1 block text-xs text-muted">
                Wholesaler and shop lists often sell by morph or river form. This becomes part of
                your public listing title so buyers know exactly which type you have.
              </span>
            </label>

            <div className="flex gap-2">
              {(["for_sale", "rehoming"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setListingType(t)}
                  className={`rounded-lg px-4 py-2 text-sm font-bold ${
                    listingType === t ? "bg-navy text-white" : "bg-sand text-muted"
                  }`}
                >
                  {t === "for_sale" ? "For sale" : "Rehoming"}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block font-semibold text-navy">Quantity</span>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-semibold text-navy">Price (AUD)</span>
                <input
                  type="number"
                  min={0}
                  step="0.5"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="h-11 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold text-navy">Description</span>
              <textarea
                maxLength={1000}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 py-2 focus-ring"
                placeholder="Health, tank mates, pickup notes, breeding line…"
              />
              <span className="text-xs text-muted">{description.length}/1000</span>
            </label>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-orange" /> Pickup available
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-orange" /> Freight considered
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-orange" /> Price negotiable (ONO)
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-navy">Completeness score</p>
              <Badge tone={completeness >= 70 ? "success" : "muted"}>{completeness}%</Badge>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-sand">
              <div className="h-full bg-orange transition-all" style={{ width: `${completeness}%` }} />
            </div>
            <p className="text-xs text-muted">Listings above 70% get a search placement boost.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["gh", "GH (dGH)"],
                  ["kh", "KH (dKH)"],
                  ["diet", "Diet notes"],
                  ["tank", "Min tank litres"],
                  ["compatibility", "Compatibility"],
                  ["breeding", "Breeding notes"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="block text-sm">
                  <span className="mb-1.5 block font-semibold text-navy">{label}</span>
                  <input
                    value={optional[key]}
                    onChange={(e) => setOptional((o) => ({ ...o, [key]: e.target.value }))}
                    className="h-10 w-full rounded-lg border border-[color:var(--line)] bg-foam px-3 focus-ring"
                  />
                </label>
              ))}
            </div>
            <p className="text-sm text-muted">Photo upload connects to Supabase Storage (1–8 images).</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-navy">Review & publish</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Listing title</dt>
                <dd className="text-right font-semibold text-navy">{listingTitle}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Scientific</dt>
                <dd className="italic text-muted">{selected?.scientificName}</dd>
              </div>
              {locality.trim() ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Locality / strain</dt>
                  <dd className="font-semibold text-navy">{locality}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Type</dt>
                <dd className="font-semibold text-navy">
                  {listingType === "for_sale" ? "For sale" : "Rehoming"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Qty / price</dt>
                <dd className="font-semibold text-navy">
                  {quantity} · ${price}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Credit cost</dt>
                <dd className="font-semibold text-orange">1 credit</dd>
              </div>
            </dl>
            <p className="rounded-xl bg-sand px-4 py-3 text-sm text-muted">
              Demo mode: publishing would deduct one credit via the ledger and set status to
              active.
            </p>
            <ButtonLink href="/dashboard" variant="orange" className="w-full">
              Publish listing
            </ButtonLink>
          </div>
        )}

        <div className="mt-8 flex justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          {step < 3 ? (
            <Button
              type="button"
              variant="primary"
              className="text-white"
              disabled={
                (step === 0 && !canProceedSpecies) || (step === 1 && !canProceedDetails)
              }
              onClick={() => setStep((s) => Math.min(3, s + 1))}
            >
              Continue
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
