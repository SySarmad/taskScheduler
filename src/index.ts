import { createInterface } from 'readline'

type Node = {
    name: string,
    parent: Node | undefined,
    children: Node[]
}

class Tree {

    private cache = new Map<string, Node>()
    private scheduled = new Map<string, boolean>()
    constructor() { }

    private createNode(name: string, parent: Node | undefined = undefined, children: Node[] = new Array<Node>()): Node {
        return {
            name: name,
            parent: parent,
            children: children
        }
    }

    private helper(node: Node) {
        if(this.scheduled.has(node.name)) {return}
        if (node.children.length > 0) {
            
            for (let child of node.children) {
                this.helper(child)
            }
        }
        if (!this.scheduled.has(node.name)) {
            this.scheduled.set(node.name, true)
        }
    }

    /* 
        it works, i might want to spend some time optimizing 
        both of these function the data structure itself i think would 
        be prone to breaking down on the right edge case,
        going for quick and dirty a bit here. 
    */

    addTask(name: string, deps: string[]): void {
        if (!this.cache.has(name)) {
            this.cache.set(name, this.createNode(name))
        }
        let parent = this.cache.get(name)
        for (let dep of deps) {
            let childName = dep.trim().replace(' ', '')
            let child = this.cache.has(childName) ? this.cache.get(childName) : this.createNode(childName, parent)
            if (child != undefined) {
                this.cache.set(childName, child)
                parent?.children.push(child)
            }
        }
    }

    
    compute(): string {
        for (let key of this.cache.keys()) {
            const node = this.cache.get(key)
            if(node !== undefined){
                this.helper(node)
            }
            
        }
        let order = '';
        for (let key of this.scheduled.keys()) {
            order += key + ' '
        }

        return order
    }

    /* 
        hate this validation function, probably wouldnt use regex at all in production and instead go for a tokenization 
        but also do it all in one step may down below in the 'main' function. But wanted to show i at least thought about it
        
    */
    correctFormat(str: string): Boolean {
        if (str.includes(':')) {
            let split = str.split(':')
            if (RegExp(/^\p{L}/, 'u').test(split[0])) {
                return true;
            }
            return false;
        }
        return false
    }

    isEmpty(): Boolean {
        return (this.cache.size === 0)
    }
}

async function main() {

    const rl = createInterface({
        input: process.stdin,
        //output: process.stdout
    });

    let tree = new Tree()
    for await (const line of rl) {
        if (line.trim()[0] === '#' || line.length === 0) {
            if (!tree.isEmpty()) {
                console.log(tree.compute())
                tree = new Tree()
            }
            continue
        }
        if (!tree.correctFormat(line)) {
            throw new Error(`Line is incorrect format: ${line}`)
        }
        const task = line.trim().split(':')
        tree.addTask(task[0], task[1].length > 0 ? task[1].split(',') : new Array<string>())
    }
    console.log(tree.compute())

}

main().then(() => process.exit(0)).catch(e => {
    console.error(e)
    process.exit(1)
})