import {NextRequest, NextResponse} from 'next/server'
import {pool} from '../../../../lib/db'

export async function POST(req: NextRequest){
    try{
        const body = await req.json(); 
        const {name,description,options} = body;

        const res = await pool.query(
            'INSERT INTO polls(name, description,options) VALUES ($1,$2,$3) RETURNING *',
            [name,description,options]
        );

        console.log('db response', res.rows[0]);

        return NextResponse.json(res.rows[0] || {} , {status: 200});
    }
    catch(err){
        console.log("error adding item", err);
        return NextResponse.json({error: 'failed to add item'}, {status: 500});
    }
}

export async function GET(req:NextRequest){
    try{
        const res = await pool.query(
            'SELECT * FROM polls'
        );

        console.log(res);

        return NextResponse.json(res.rows, {status:200});
    }
    catch(error){
        console.error("error getting items", error);
        return NextResponse.json({error: "error getting items"}, {status:500});
    }

}

export async function DELETE(req:NextRequest){
    try{
        const body = await req.json();
        const {item} = body;

        const res = await pool.query(
            'DELETE FROM items where (name) = $1',
            [item]
        );

        console.log(res);
        return NextResponse.json(res,{status:200});
    }
    catch(error){
        console.error("error deleting item", error);
        NextResponse.json({error: "error deleting"}, {status:500});

    }
}

export async function PUT(req:NextRequest){
    try{
        const body = await req.json();
        const {item, newName} = body;

        const res = await pool.query(
            'UPDATE items SET name = $2 WHERE name =$1 RETURNING *',
            [item,newName]
        );
        console.log(res);
        return NextResponse.json(res,{status:200});
    }
    catch(error){
        console.error("error updating item", error);
        NextResponse.json({error: "error updating"}, {status:500});

    }
}
