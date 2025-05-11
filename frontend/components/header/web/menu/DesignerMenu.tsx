import { Grid } from "@/components/ui/grid";
//import { Link } from "@/components/ui/link";
import { Link } from "expo-router";

export default function DesignerMenu({designers}){

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
                            <Link
                                href="#"
                                key={designer.code}
                                className="text-typography-600 mr-4 pointer"
                            >
                                {designer.title || designer.name}
                            </Link>
                        )
                    }
                )
            }
        </Grid>
    );
}