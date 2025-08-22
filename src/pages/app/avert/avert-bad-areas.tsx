import { getAvertBadAreas } from "@/api/get-avert-bad-areas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useQuery } from "@tanstack/react-query";
import { Frown } from "lucide-react";

export function BadAreas () {
    const { data: badAreas, isFetching: isLoading } = useQuery({
    queryKey: ['avert', 'piores-pracas'],
    queryFn: getAvertBadAreas,
  })
    console.log(badAreas)
    return (
        <Card className="col-span-3">
            <CardHeader>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between">
                        <CardTitle className="text-base font-medium">
                            Piores praças
                        </CardTitle>
                        <Frown />
                    </div>
                    <CardDescription>
                        Piores praças no mês corrente
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {isLoading ? 
                        ""
                         :
                        badAreas?.map((content, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                            <Card>
                                <CardContent className="flex flex-col aspect-square items-center justify-center p-5 gap-2">
                                <span className="text-3xl font-semibold">{content.praca}</span>
                                <span className="font-semibold text-sm">Percentual da meta atingida: {' '}
                                    <span className="text-sm font-bold text-rose-500">{content.percentMetaAtingida}%</span>
                                </span>
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
        </Card>
    )
}