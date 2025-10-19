import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNameBySlug, MOCK_NAMES, type NameRecord } from "@/data/names.mock";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Star, Globe, BookOpen, Sparkles } from "lucide-react";

interface NamePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return MOCK_NAMES.map((name) => ({
    slug: name.slug,
  }));
}

export async function generateMetadata({
  params,
}: NamePageProps): Promise<Metadata> {
  const name = getNameBySlug(params.slug);

  if (!name) {
    return {
      title: "Name Not Found - NamAstra",
    };
  }

  const title = `${name.name} - Hindu Baby Name Meaning & Origin | NamAstra`;
  const description = `Discover the meaning, origin, and significance of the name ${name.name}. ${name.meaning}. Perfect for ${name.gender} babies.`;

  return {
    title,
    description,
    keywords: [
      name.name,
      "Hindu baby names",
      name.gender,
      name.meaning,
      name.language,
      name.deityAffinity !== "None" ? name.deityAffinity : "",
      ...name.sources,
      ...name.regionTags,
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://namastra.com/name/${name.slug}`,
      images: [
        {
          url: `https://namastra.com/api/og/name/${name.slug}`,
          width: 1200,
          height: 630,
          alt: `${name.name} - Hindu Baby Name`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://namastra.com/api/og/name/${name.slug}`],
    },
    alternates: {
      canonical: `https://namastra.com/name/${name.slug}`,
    },
  };
}

function generateJsonLd(name: NameRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name.name,
    alternateName: name.nicknames,
    description: name.meaning,
    inLanguage: name.language,
    sameAs: [`https://namastra.com/name/${name.slug}`],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Gender",
        value: name.gender,
      },
      {
        "@type": "PropertyValue",
        name: "Syllables",
        value: name.syllables,
      },
      {
        "@type": "PropertyValue",
        name: "Deity Affinity",
        value: name.deityAffinity,
      },
      {
        "@type": "PropertyValue",
        name: "Sources",
        value: name.sources.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Region",
        value: name.regionTags.join(", "),
      },
    ],
  };
}

export default function NamePage({ params }: NamePageProps) {
  const name = getNameBySlug(params.slug);

  if (!name) {
    notFound();
  }

  const jsonLd = generateJsonLd(name);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white via-white to-zinc-50">
        {/* Header */}
        <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
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
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" /> Save
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Name Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500">
                {name.name}
              </span>
            </h1>
            {name.scripts?.Devanagari && (
              <div className="text-3xl md:text-4xl font-medium text-muted-foreground mb-4">
                {name.scripts.Devanagari}
              </div>
            )}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {name.meaning}
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4" /> Gender
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="capitalize">
                  {name.gender}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Syllables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{name.syllables}</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{name.language}</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Origin & Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {name.sources.map((source) => (
                      <Badge key={source} variant="outline">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>

                {name.deityAffinity !== "None" && (
                  <div>
                    <h4 className="font-medium mb-2">Deity Affinity</h4>
                    <Badge variant="outline">{name.deityAffinity}</Badge>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Regions</h4>
                  <div className="flex flex-wrap gap-2">
                    {name.regionTags.map((region) => (
                      <Badge key={region} variant="secondary">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pronunciation & Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Phonetic Start</h4>
                  <Badge variant="outline">{name.phoneticStart}</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Global Pronunciation</h4>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < name.globalPronounce
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">
                      {name.globalPronounce}/5
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Modernity</h4>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < name.modernity
                            ? "text-blue-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">
                      {name.modernity}/5
                    </span>
                  </div>
                </div>

                {name.popularity && (
                  <div>
                    <h4 className="font-medium mb-2">Popularity</h4>
                    <Badge variant="outline" className="capitalize">
                      {name.popularity}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Nicknames & Related Names */}
          {(name.nicknames.length > 0 || name.related.length > 0) && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Related Names</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {name.nicknames.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Nicknames</h4>
                    <div className="flex flex-wrap gap-2">
                      {name.nicknames.map((nickname) => (
                        <Badge key={nickname} variant="secondary">
                          {nickname}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {name.related.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Similar Names</h4>
                    <div className="flex flex-wrap gap-2">
                      {name.related.map((related) => (
                        <Badge key={related} variant="outline">
                          {related}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="text-center">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Love this name?</h3>
              <p className="text-muted-foreground mb-4">
                Save it to your shortlist and explore more beautiful Hindu
                names.
              </p>
              <div className="flex gap-3 justify-center">
                <Button className="gap-2">
                  <Heart className="h-4 w-4" /> Add to Shortlist
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share with Family
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
