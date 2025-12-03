import React, { useMemo, useState } from "react";

const EditorFlat = ({
    content = "",
    truncateLength = null,
    enableReadMore = false,
    className = "",
    tagStyles = {},
}) => {
    const [expanded, setExpanded] = useState(false);

    const htmlProcessed = useMemo(() => {
        if (!content) return "<p>Belum ada materi</p>";

        let cleaned = content
            // hilangkan tag selain p, h1-h6, span
            .replace(/<(?!\/?(p|h[1-6]|span)\b)[^>]+>/gi, "")
            // span warna
            .replace(
                /<span data-color="([^"]+)"/g,
                (_, color) => `<span style="color:${color}"`
            );

        // dir="rtl" untuk paragraf Arab
        cleaned = cleaned.replace(/<p>(.*?)<\/p>/gi, (_, text) => {
            const hasArabic = /[\u0600-\u06FF]/.test(text);
            return `<p${hasArabic ? ' dir="rtl"' : ""}>${text.trim()}</p>`;
        });

        // reset margin, padding, dan hilangkan spasi di dalam tag
        cleaned = cleaned.replace(
            /<(p|h[1-6])>(.*?)<\/\1>/gi,
            (_, tag, text) => {
                const styleString =
                    tagStyles[tag] ||
                    "margin:0;padding:0;font-size:1rem;line-height:0.3;";
                return `<${tag} style="${styleString}">${text.trim()}</${tag}>`;
            }
        );

        // hilangkan whitespace berlebih antar tag
        cleaned = cleaned.replace(/>\s+</g, "><");

        return cleaned;
    }, [content, tagStyles]);

    const plainText = useMemo(() => {
        const temp = document.createElement("div");
        temp.innerHTML = htmlProcessed;
        return temp.textContent || temp.innerText || "";
    }, [htmlProcessed]);

    const isTooLong = truncateLength && plainText.length > truncateLength;

    const truncateHTML = (html, maxLength) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        let currentLength = 0;
        let truncatedHTML = "";

        const traverse = (node) => {
            if (currentLength >= maxLength) return;

            if (node.nodeType === Node.TEXT_NODE) {
                const remaining = maxLength - currentLength;
                const text = node.textContent?.trim() || "";
                if (text.length <= remaining) {
                    truncatedHTML += text;
                    currentLength += text.length;
                } else {
                    truncatedHTML += text.slice(0, remaining) + "…";
                    currentLength = maxLength;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tag = node.nodeName.toLowerCase();
                let dirAttr = "";

                if (
                    /p|h[1-6]/.test(tag) &&
                    /[\u0600-\u06FF]/.test(node.textContent)
                ) {
                    dirAttr = ' dir="rtl"';
                }

                const styleAttr = tagStyles[tag]
                    ? ` style="${tagStyles[tag]}"`
                    : tag === "h3"
                    ? ' style="margin:0;padding:0;font-size:1rem;line-height:0;"'
                    : ' style="margin:0;padding:0;"';

                truncatedHTML += `<${tag}${dirAttr}${styleAttr}>`;

                for (const child of node.childNodes) {
                    traverse(child);
                    if (currentLength >= maxLength) break;
                }

                truncatedHTML += `</${tag}>`;
            }
        };

        div.childNodes.forEach(traverse);
        return truncatedHTML;
    };

    const displayedHTML = useMemo(() => {
        if (!truncateLength || expanded) return htmlProcessed;
        return truncateHTML(htmlProcessed, truncateLength);
    }, [truncateLength, expanded, htmlProcessed]);

    return (
        <div
            className={`editor-content ${className} ltr`}
            style={{ marginBottom: -10, padding: 0 }}
        >
            <div dangerouslySetInnerHTML={{ __html: displayedHTML }} />
        </div>
    );
};

export default EditorFlat;
