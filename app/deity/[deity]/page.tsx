import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNamesByDeity, DEITIES, type Deity } from "@/data/names.mock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Sparkles, Star, Heart } from "lucide-react";

interface DeityPageProps {
  params: {
    deity: string;
  };
}

export async function generateStaticParams() {
  return DEITIES.filter((deity) => deity !== "None").map((deity) => ({
    deity: deity.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: DeityPageProps): Promise<Metadata> {
  const deity = (params.deity.charAt(0).toUpperCase() +
    params.deity.slice(1)) as Deity;
  const names = getNamesByDeity(deity);

  if (names.length === 0) {
    return {
      title: "Deity Not Found - NamAstra",
    };
  }

  const title = `${deity} Baby Names - Hindu Names Inspired by ${deity} | NamAstra`;
  const description = `Discover beautiful Hindu baby names inspired by ${deity}. ${names.length} meaningful names with origins, meanings, and significance.`;

  return {
    title,
    description,
    keywords: [
      `${deity} baby names`,
      "Hindu names",
      deity,
      "baby names",
      "meaningful names",
      ...names.slice(0, 5).map((n) => n.name),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://namastra.com/deity/${deity.toLowerCase()}`,
    },
    alternates: {
      canonical: `https://namastra.com/deity/${deity.toLowerCase()}`,
    },
  };
}

export default function DeityPage({ params }: DeityPageProps) {
  const deity = (params.deity.charAt(0).toUpperCase() +
    params.deity.slice(1)) as Deity;
  const names = getNamesByDeity(deity);

  if (names.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 grid place-items-center">
                <Sparkles className="text-white h-4 w-4" />
              </div>
              <div>
                <div className="font-bold text-lg">NamAstra</div>
                <div className="text-xs text-muted-foreground">
                  Hindu Baby Names
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Deity Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500">
              {deity} Names
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Discover beautiful Hindu baby names inspired by {deity}. Each name
            carries deep meaning and spiritual significance.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              {names.length} Names
            </Badge>
            <Badge variant="outline">Hindu Tradition</Badge>
            <Badge variant="outline">Spiritual Meaning</Badge>
          </div>
        </div>

        {/* Names Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {names.map((name) => (
            <Card
              key={name.id}
              className="group hover:shadow-xl transition-shadow rounded-2xl border-muted/40"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <Link
                      href={`/name/${name.slug}`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {name.name}
                    </Link>
                  </CardTitle>
                  <Badge variant="secondary" className="rounded-full">
                    {name.syllables} syllables
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {name.scripts?.Devanagari && (
                    <Badge variant="outline">{name.scripts.Devanagari}</Badge>
                  )}
                  <Badge variant="outline">{name.gender}</Badge>
                  {name.sources.slice(0, 2).map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{name.meaning}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{name.language}</Badge>
                  <Badge variant="secondary">
                    {name.regionTags.join(" · ")}
                  </Badge>
                  {name.popularity && (
                    <Badge variant="outline">{name.popularity}</Badge>
                  )}
                </div>
              </CardContent>
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between">
                  <Link href={`/name/${name.slug}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      View Details
                    </Button>
                  </Link>
                  <Button size="sm" className="gap-2 rounded-full">
                    <Heart className="h-4 w-4" /> Save
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {names.length === 0 && (
          <Card className="mt-6">
            <CardContent className="p-8 text-center text-muted-foreground">
              No names found for {deity}. Try exploring other deities or use our
              search feature.
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-12 text-center">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">
              Looking for more names?
            </h3>
            <p className="text-muted-foreground mb-4">
              Explore our complete collection of Hindu baby names or use our
              AI-powered search.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/">
                <Button className="gap-2">
                  <Sparkles className="h-4 w-4" /> Browse All Names
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" /> AI Search
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
