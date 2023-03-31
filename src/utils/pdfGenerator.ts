import * as pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions, Content } from "pdfmake/interfaces";
import { BingoCard } from "../types/types";

function generatePDF (theme: string, themeColor: string, cards: BingoCard[]) {
    const images = {
        Header: `${window.location.origin}/images/${theme.toLowerCase()}-header.png`,
        Logo: `${window.location.origin}/images/${theme.toLowerCase()}-logo.png`,
    }
    const fonts = {
        [theme] : {
            normal: `${window.location.origin}/fonts/${theme.toLocaleLowerCase()}.ttf`,
        }
    }
    const dd: TDocumentDefinitions = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [40, 175, 40, 60],
        header: {
            image: 'Header',
            alignment: 'center',
            width: 500,
            margin: [0, 20, 0, 0]
        },
        background: {
            image: 'Logo',
            alignment: 'center',
            fit: [300, 300],
            margin: [0, 250, 0, 0]
        },
        content: [
            ...createPDFContent(themeColor,cards),
        ],
        images: images,
        defaultStyle: {
            font: theme,
        }
    }
    pdfMake.createPdf(dd, undefined, fonts).open();
}

export default generatePDF;

const createPDFContent = (themeColor: string, cards: BingoCard[]) => {
    const content = cards.map((card) => {
        return {
            svg: generateCard(themeColor, card.text, card.signature),
            fit: [200, 250],
        }
    });
    if (!content.length) {
        return [{
            text: 'Je hebt nog niks afgevinkt, download de pdf wanneer je tenminste één bingo categorie afgevinkt hebt.'
        }]
    }
    const result: Content[] = [];
    const chunkSize = 3;
    for (let i = 0; i < content.length; i += chunkSize) {
        const chunk = content.slice(i, i + chunkSize);
        result.push({
            columns: [...chunk],
            columnGap: 10,
            margin: [0, 0, 0, 10]
        } as Content );
    }
    return result;
}

const generateCard = ( cardColor: string, headerText: string, bodyContent: string ) => {
    const content = createCardContent(headerText, bodyContent, 15, 30);

    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
        <rect fill="white" stroke-width="2" stroke="${cardColor}" x="2" y="2" width="196" height="296" rx="15" />
        ${content.header.outerHTML}
        ${content.body.outerHTML}
    </svg>`
}

function createCardContent(headerText: string, bodyContent: string, x: number, y: number) {
    const header = createSVGText(headerText, 14, 14, 20, x, y);
    let body: SVGImageElement | SVGTextElement;

    if (bodyContent.startsWith('data:image')){
        const base64str = bodyContent;
        const svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        svgImage.setAttributeNS(null, 'x', String(x));
        svgImage.setAttributeNS(null, 'y', String(y + 45));
        svgImage.setAttributeNS(null, 'href', base64str);
        svgImage.setAttributeNS(null, 'width', "85%");
        svgImage.setAttributeNS(null, 'height', "200");
        body = svgImage;
        return { header, body };
    }
    body = createSVGText(bodyContent, 12, 12, 28, x, y + 60);
    return { header, body };
}

function createSVGText (text: string, lineHeight: number, fontSize: number, maxChar: number, x: number, y: number) {
    const svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    svgText.setAttributeNS(null, 'x', String(x));
    svgText.setAttributeNS(null, 'y', String(y));
    svgText.setAttributeNS(null, 'font-size', String(fontSize));

    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        if (testLine.length > maxChar)
        {
            const svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            svgTSpan.setAttributeNS(null, 'x', String(x));
            svgTSpan.setAttributeNS(null, 'y', String(y));

            const tSpanTextNode = document.createTextNode(line);
            svgTSpan.appendChild(tSpanTextNode);
            svgText.appendChild(svgTSpan);

            line = words[n] + " ";
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }

    const svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    svgTSpan.setAttributeNS(null, 'x', String(x));
    svgTSpan.setAttributeNS(null, 'y', String(y));

    const tSpanTextNode = document.createTextNode(line);
    svgTSpan.appendChild(tSpanTextNode);

    svgText.appendChild(svgTSpan);

    return svgText
}