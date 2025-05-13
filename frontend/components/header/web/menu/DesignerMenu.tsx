import { Grid } from "@/components/ui/grid";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from 'expo-router';

export default function DesignerMenu({designers, setShowMenu, setActiveTab}){

    const router = useRouter();
    const handleClick = (designer: any) => {
        setShowMenu(false);
        setActiveTab({});
        const url = `/search?brand=${designer.name}`;
        router.replace(url);
    }

    return (
        <Grid
            className="gap-5"
            _extra={{
                className: "grid-cols-8 grid-rows-3 grid-flow-col",
            }}
        >
            {
                designers.map(
                    (designer) => {
                        return(
                            <Pressable
                                onPress={() => {handleClick(designer)}}
                                key={designer.code}
                                className="text-typography-600 mr-4"
                            >
                                {designer.title || designer.name}
                            </Pressable>
                        )
                    }
                )
            }
        </Grid>
    );
}