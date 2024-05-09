import { Plugin, Editor, MarkdownView, Notice } from 'obsidian';

interface Text2ChatBubbleStylerSettings {
    // Define any specific settings you might need; for now, let's keep it simple
    exampleSetting: string;
}

const DEFAULT_SETTINGS: Text2ChatBubbleStylerSettings = {
    exampleSetting: 'default value'
}

export default class Text2ChatBubbleStyler extends Plugin {
    settings: Text2ChatBubbleStylerSettings;

    async onload() {
        await this.loadSettings();

        // Add command to apply chat bubble style
        this.addCommand({
            id: 'apply-chat-bubble-style',
            name: 'Apply Chat Bubble Style',
            callback: () => this.applyChatBubbleStyle(),
            hotkeys: [{
                modifiers: ["Mod"],
                key: 'b'
            }]
        });
    }

    onunload() {
        // Perform cleanup if necessary
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    applyChatBubbleStyle() {
        const activeLeaf = this.app.workspace.activeLeaf;
        if (activeLeaf?.view instanceof MarkdownView) {
            const editor = activeLeaf.view.editor;
            const selection = editor.getSelection();
            if (selection) {
                const chatFormatted = this.formatAsChatBubble(selection);
                editor.replaceSelection(chatFormatted);
            } else {
                new Notice('No text selected!');
            }
        }
    }

    formatAsChatBubble(text: string): string {
        // A simple formatter that wraps text in div and class names
        return `<div class="chat"><div class="msg sent">${text.replace(/\n/g, '<br>')}</div></div>`;
    }
}
