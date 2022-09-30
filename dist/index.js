"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
class Tree {
    constructor() {
        this.cache = new Map();
        this.scheduled = new Map();
    }
    createNode(name, parent = undefined, children = new Array()) {
        return {
            name: name,
            parent: parent,
            children: children
        };
    }
    helper(node) {
        if (this.scheduled.has(node.name)) {
            return;
        }
        if (node.children.length > 0) {
            for (let child of node.children) {
                this.helper(child);
            }
        }
        if (!this.scheduled.has(node.name)) {
            this.scheduled.set(node.name, true);
        }
    }
    /*
        it works, i might want to spend some time optimizing
        both of these function the data structure itself i think would
        be prone to breaking down on the right edge case,
        going for quick and dirty a bit here.
    */
    addTask(name, deps) {
        if (!this.cache.has(name)) {
            this.cache.set(name, this.createNode(name));
        }
        let parent = this.cache.get(name);
        for (let dep of deps) {
            let childName = dep.trim().replace(' ', '');
            let child = this.cache.has(childName) ? this.cache.get(childName) : this.createNode(childName, parent);
            if (child != undefined) {
                this.cache.set(childName, child);
                parent === null || parent === void 0 ? void 0 : parent.children.push(child);
            }
        }
    }
    compute() {
        for (let key of this.cache.keys()) {
            const node = this.cache.get(key);
            if (node !== undefined) {
                this.helper(node);
            }
        }
        let order = '';
        for (let key of this.scheduled.keys()) {
            order += key + ' ';
        }
        return order;
    }
    /*
        hate this validation function, probably wouldnt use regex at all in production and instead go for a tokenization
        but also do it all in one step may down below in the 'main' function. But wanted to show i at least thought about it
        
    */
    correctFormat(str) {
        if (str.includes(':')) {
            let split = str.split(':');
            if (RegExp(/^\p{L}/, 'u').test(split[0])) {
                return true;
            }
            return false;
        }
        return false;
    }
    isEmpty() {
        return (this.cache.size === 0);
    }
}
async function main() {
    const rl = (0, readline_1.createInterface)({
        input: process.stdin,
        //output: process.stdout
    });
    let tree = new Tree();
    for await (const line of rl) {
        if (line.trim()[0] === '#' || line.length === 0) {
            if (!tree.isEmpty()) {
                console.log(tree.compute());
                tree = new Tree();
            }
            continue;
        }
        if (!tree.correctFormat(line)) {
            throw new Error(`Line is incorrect format: ${line}`);
        }
        const task = line.trim().split(':');
        tree.addTask(task[0], task[1].length > 0 ? task[1].split(',') : new Array());
    }
    console.log(tree.compute());
}
main().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBMEM7QUFRMUMsTUFBTSxJQUFJO0lBSU47UUFGUSxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUE7UUFDL0IsY0FBUyxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFBO0lBQzlCLENBQUM7SUFFVCxVQUFVLENBQUMsSUFBWSxFQUFFLFNBQTJCLFNBQVMsRUFBRSxXQUFtQixJQUFJLEtBQUssRUFBUTtRQUN2RyxPQUFPO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUE7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLElBQVU7UUFDckIsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBQyxPQUFNO1NBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFMUIsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ3JCO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDdEM7SUFDTCxDQUFDO0lBRUQ7Ozs7O01BS0U7SUFFRixPQUFPLENBQUMsSUFBWSxFQUFFLElBQWM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDOUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQyxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNsQixJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMzQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ3RHLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO2dCQUNoQyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUMvQjtTQUNKO0lBQ0wsQ0FBQztJQUdELE9BQU87UUFDSCxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEMsSUFBRyxJQUFJLEtBQUssU0FBUyxFQUFDO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ3BCO1NBRUo7UUFDRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkMsS0FBSyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUE7U0FDckI7UUFFRCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNGLGFBQWEsQ0FBQyxHQUFXO1FBQ3JCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzFCLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7Q0FDSjtBQUVELEtBQUssVUFBVSxJQUFJO0lBRWYsTUFBTSxFQUFFLEdBQUcsSUFBQSwwQkFBZSxFQUFDO1FBQ3ZCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztRQUNwQix3QkFBd0I7S0FDM0IsQ0FBQyxDQUFDO0lBRUgsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtJQUNyQixJQUFJLEtBQUssRUFBRSxNQUFNLElBQUksSUFBSSxFQUFFLEVBQUU7UUFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7Z0JBQzNCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO2FBQ3BCO1lBQ0QsU0FBUTtTQUNYO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxFQUFFLENBQUMsQ0FBQTtTQUN2RDtRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFVLENBQUMsQ0FBQTtLQUN2RjtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFFL0IsQ0FBQztBQUVELElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUludGVyZmFjZSB9IGZyb20gJ3JlYWRsaW5lJ1xuXG50eXBlIE5vZGUgPSB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHBhcmVudDogTm9kZSB8IHVuZGVmaW5lZCxcbiAgICBjaGlsZHJlbjogTm9kZVtdXG59XG5cbmNsYXNzIFRyZWUge1xuXG4gICAgcHJpdmF0ZSBjYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBOb2RlPigpXG4gICAgcHJpdmF0ZSBzY2hlZHVsZWQgPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKVxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU5vZGUobmFtZTogc3RyaW5nLCBwYXJlbnQ6IE5vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsIGNoaWxkcmVuOiBOb2RlW10gPSBuZXcgQXJyYXk8Tm9kZT4oKSk6IE5vZGUge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhlbHBlcihub2RlOiBOb2RlKSB7XG4gICAgICAgIGlmKHRoaXMuc2NoZWR1bGVkLmhhcyhub2RlLm5hbWUpKSB7cmV0dXJufVxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBlcihjaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc2NoZWR1bGVkLmhhcyhub2RlLm5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlZC5zZXQobm9kZS5uYW1lLCB0cnVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogXG4gICAgICAgIGl0IHdvcmtzLCBpIG1pZ2h0IHdhbnQgdG8gc3BlbmQgc29tZSB0aW1lIG9wdGltaXppbmcgXG4gICAgICAgIGJvdGggb2YgdGhlc2UgZnVuY3Rpb24gdGhlIGRhdGEgc3RydWN0dXJlIGl0c2VsZiBpIHRoaW5rIHdvdWxkIFxuICAgICAgICBiZSBwcm9uZSB0byBicmVha2luZyBkb3duIG9uIHRoZSByaWdodCBlZGdlIGNhc2UsXG4gICAgICAgIGdvaW5nIGZvciBxdWljayBhbmQgZGlydHkgYSBiaXQgaGVyZS4gXG4gICAgKi9cblxuICAgIGFkZFRhc2sobmFtZTogc3RyaW5nLCBkZXBzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuY2FjaGUuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldChuYW1lLCB0aGlzLmNyZWF0ZU5vZGUobmFtZSkpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuY2FjaGUuZ2V0KG5hbWUpXG4gICAgICAgIGZvciAobGV0IGRlcCBvZiBkZXBzKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGROYW1lID0gZGVwLnRyaW0oKS5yZXBsYWNlKCcgJywgJycpXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNhY2hlLmhhcyhjaGlsZE5hbWUpID8gdGhpcy5jYWNoZS5nZXQoY2hpbGROYW1lKSA6IHRoaXMuY3JlYXRlTm9kZShjaGlsZE5hbWUsIHBhcmVudClcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlLnNldChjaGlsZE5hbWUsIGNoaWxkKVxuICAgICAgICAgICAgICAgIHBhcmVudD8uY2hpbGRyZW4ucHVzaChjaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgIGNvbXB1dGUoKTogc3RyaW5nIHtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuY2FjaGUua2V5cygpKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5jYWNoZS5nZXQoa2V5KVxuICAgICAgICAgICAgaWYobm9kZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmhlbHBlcihub2RlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9yZGVyID0gJyc7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLnNjaGVkdWxlZC5rZXlzKCkpIHtcbiAgICAgICAgICAgIG9yZGVyICs9IGtleSArICcgJ1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9yZGVyXG4gICAgfVxuXG4gICAgLyogXG4gICAgICAgIGhhdGUgdGhpcyB2YWxpZGF0aW9uIGZ1bmN0aW9uLCBwcm9iYWJseSB3b3VsZG50IHVzZSByZWdleCBhdCBhbGwgaW4gcHJvZHVjdGlvbiBhbmQgaW5zdGVhZCBnbyBmb3IgYSB0b2tlbml6YXRpb24gXG4gICAgICAgIGJ1dCBhbHNvIGRvIGl0IGFsbCBpbiBvbmUgc3RlcCBtYXkgZG93biBiZWxvdyBpbiB0aGUgJ21haW4nIGZ1bmN0aW9uLiBCdXQgd2FudGVkIHRvIHNob3cgaSBhdCBsZWFzdCB0aG91Z2h0IGFib3V0IGl0XG4gICAgICAgIFxuICAgICovXG4gICAgY29ycmVjdEZvcm1hdChzdHI6IHN0cmluZyk6IEJvb2xlYW4ge1xuICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgICAgICAgIGxldCBzcGxpdCA9IHN0ci5zcGxpdCgnOicpXG4gICAgICAgICAgICBpZiAoUmVnRXhwKC9eXFxwe0x9LywgJ3UnKS50ZXN0KHNwbGl0WzBdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlzRW1wdHkoKTogQm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5jYWNoZS5zaXplID09PSAwKVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIGNvbnN0IHJsID0gY3JlYXRlSW50ZXJmYWNlKHtcbiAgICAgICAgaW5wdXQ6IHByb2Nlc3Muc3RkaW4sXG4gICAgICAgIC8vb3V0cHV0OiBwcm9jZXNzLnN0ZG91dFxuICAgIH0pO1xuXG4gICAgbGV0IHRyZWUgPSBuZXcgVHJlZSgpXG4gICAgZm9yIGF3YWl0IChjb25zdCBsaW5lIG9mIHJsKSB7XG4gICAgICAgIGlmIChsaW5lLnRyaW0oKVswXSA9PT0gJyMnIHx8IGxpbmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXRyZWUuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codHJlZS5jb21wdXRlKCkpXG4gICAgICAgICAgICAgICAgdHJlZSA9IG5ldyBUcmVlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0cmVlLmNvcnJlY3RGb3JtYXQobGluZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTGluZSBpcyBpbmNvcnJlY3QgZm9ybWF0OiAke2xpbmV9YClcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YXNrID0gbGluZS50cmltKCkuc3BsaXQoJzonKVxuICAgICAgICB0cmVlLmFkZFRhc2sodGFza1swXSwgdGFza1sxXS5sZW5ndGggPiAwID8gdGFza1sxXS5zcGxpdCgnLCcpIDogbmV3IEFycmF5PHN0cmluZz4oKSlcbiAgICB9XG4gICAgY29uc29sZS5sb2codHJlZS5jb21wdXRlKCkpXG5cbn1cblxubWFpbigpLnRoZW4oKCkgPT4gcHJvY2Vzcy5leGl0KDApKS5jYXRjaChlID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgcHJvY2Vzcy5leGl0KDEpXG59KSJdfQ==