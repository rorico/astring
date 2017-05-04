const fs = require( 'fs' )
const path = require( 'path' )
const { SourceMapGenerator } = require( 'source-map' )
const acorn = require( 'acorn' )
const { generate } = require( '../dist/astring' )


const code = fs.readFileSync( path.join( __dirname, 'index.js' ), 'utf8' )

const ast = acorn.parse( code, {
	ecmaVersion: 8,
	sourceType: 'module',
	locations: true,
} )

const sourceMap = new SourceMapGenerator( {
	file: 'index.js',
} )

const formattedCode = generate( ast, {
	indent: '    ',
	sourceMap,
} )

console.log( formattedCode )
console.log( '---' )
console.log( sourceMap.toString() )
