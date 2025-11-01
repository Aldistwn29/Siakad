import { Sheet } from "@/Componets/ui/sheet";
import { SheetTrigger } from "@/Componets/ui/sheet";
import { Button } from "@/Componets/ui/button";
import { IconEye } from "@tabler/icons-react";
import { SheetContent, SheetHeader, SheetTitle } from "@/Componets/ui/sheet";
import { Title } from "@radix-ui/react-dialog";
import { Table } from "@/Componets/ui/table";
import { TableCaption, TableHead, TableRow } from "@/Componets/ui/table";
import { TableBody, TableCell, TableFooter } from "./ui/table";

export function Grades( {studyResult, grades, name = null} ){
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="purple" size="sm">
                    <IconEye className="text-white size-4"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="top">
                <SheetHeader>
                    <SheetTitle>Detail kartu hasil studi mahasiswa {name}</SheetTitle>
                    <SheetContent>Detail kartu hasil studi mahasiswa</SheetContent>
                    <Table className="w-full border">
                        <TableRow>
                            <TableHead className="border">No</TableHead>
                            <TableHead className="border">Kode</TableHead>
                            <TableHead className="border">Mata Kuliah</TableHead>
                            <TableHead className="border">SKS</TableHead>
                            <TableHead className="border">Huruf Mutu</TableHead>
                            <TableHead className="border">Bobot</TableHead>
                            <TableHead className="border">Nilai</TableHead>
                        </TableRow>
                        <TableBody>
                            {grades.map((grade, index) => {
                                <TableRow key={index}>
                                    <TableCell className="border">{index + 1}</TableCell>
                                    <TableCell className="border">{grade.course.code}</TableCell>
                                    <TableCell className="border">{grade.course.name}</TableCell>
                                    <TableCell className="border">{grade.course.cerdit}</TableCell>
                                    <TableCell className="border">{grade.letter}</TableCell>
                                    <TableCell className="border">{grade.weight_of_value}</TableCell>
                                    <TableCell className="border">{grade.grade}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan="3">IPK Semester</TableCell>
                                <TableCell className="border">{studyResult.gpa}</TableCell>
                                <TableCell className="border"></TableCell>
                                <TableCell className="border"></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}