import Observer from './observer';

/**
 * Undo/Redo feature for Editor.js.
 *
 * @typedef {Object} Undo
 * @description Feature's initialization class.
 * @property {Object} editor — Editor.js instance object.
 * @property {Number} maxLength - Max amount of changes recorded by the history stack.
 * @property {Function} onUpdate - Callback called when the user performs an undo or redo action.
 * @property {Boolean} shouldSaveHistory - Defines if the plugin should save the change in the stack
 * @property {Object} initialItem - Initial data object.
 */
export default class Undo {
  /**
   * @param options — Plugin custom options.
   */
  constructor(options) {
    const defaultOptions = {
      maxLength: 30,
      onUpdate() {},
    };
  
    this.editor = options.editor;
    this.shouldSaveHistory = true;
    this.bigBrotherMode = options.bigBrotherMode || false;
    
    this.maxLength = options.maxLength
      ? options.maxLength
      : defaultOptions.maxLength;
    this.onUpdate = options.onUpdate
      ? options.onUpdate
      : defaultOptions.onUpdate;

    const observer = new Observer(
      () => this.registerChange(),
      this.editor.configuration.holder,
    );
    
    /**
   * Allows to temporary disable mutations handling
   */

    this.disable = function () {
      observer.disable();
    }
    
    this.enable = function () {
      observer.enable();
    }
    
    observer.setMutationObserver();
    this.setEventListeners();
    this.initialItem = null;
    this.clear();
  }

  /**
   * Truncates the history stack when it excedes the limit of changes.
   *
   * @param {Object} stack  Changes history stack.
   * @param {Number} stack  Limit of changes recorded by the history stack.
   */
  truncate(stack, limit) {
    while (stack.length > limit) {
      stack.shift();
    }
  }

  /**
   * Initializes the stack when the user provides initial data.
   *
   * @param {Object} initialItem  Initial data provided by the user.
   */
  initialize(initialItem) {
    const initialData = 'blocks' in initialItem ? initialItem.blocks : initialItem;
    const initialIndex = initialData.length - 1;
    const firstElement = { index: initialIndex, state: initialData };
    this.stack[0] = firstElement;
    this.initialItem = firstElement;
  }

  /**
   * Clears the history stack.
   */
  clear() {
    this.stack = this.initialItem
      ? [this.initialItem]
      : [{ index: 0, state: [] }];
    this.position = 0;
    this.onUpdate();
  }

  /**
   * Registers the data returned by API's save method into the history stack.
   */
  registerChange() {
    if (this.editor && this.editor.save && this.shouldSaveHistory) {
      this.disable();
      this.editor.save().then((savedData) => {
        if (this.editorDidUpdate(savedData.blocks)) this.save(savedData.blocks);
        this.enable();
      });
      this.editor.save().catch((reason)=>{
        this.enable();
      });
    }
   this.shouldSaveHistory = true;
  }

  /**
   * Display changes between two states with colors in github like fashion
   */ 
  viewChanges(state, newState, console) {
    
     if( JSON.stringify(state) !== JSON.stringify(newState)) {
       
        var html=[]; 
        var strWindowFeatures = "location=no,height=570,width=800,scrollbars=yes,status=yes";
       
          html.push('<style>\n\tins { background-color: #cdffd8; }\n\tdel { background-color: #ffdce0; }\n</style>')
          
          var diffHTML=window.diffString( JSON.stringify(state, null, 4 ) , JSON.stringify(newState, null, 4 ));
          html.push(diffHTML);
        
          html.push("<script> var del=document.querySelectorAll('del')[0];\ndel.scrollIntoView(true); </script>");
          
          if(notifier) {
             notifier.show({
              type:'console',
              id:'test',
              layout: 'right',
              time: 4000,
              title:'View Changes  (' + diffHTML.length + ') from '+(console || 'console'),
              message:html.join('\n'),
            })
          } else {
            var childWindow= window.open('', "_blank", strWindowFeatures);
            childWindow.document.write(html.join('\n'));
            childWindow.focus();
          }
           
      }
  }  

  /**
   * Checks if the saved data has to be added to the history stack.
   *
   * @param {Object} newData  New data to be saved in the history stack.
   * @returns {Boolean}
   */
  editorDidUpdate(newData) {
    const { state } = this.stack[this.position];
    if(this.bigBrotherMode) this.viewChanges(state, newData,'Undo.editorDidUpdate');
    if (newData.length !== state.length) return true;
    
    return JSON.stringify(state) !== JSON.stringify(newData);
  }

  /**
   * Adds the saved data in the history stack and updates current position.
   */
  save(state) {
    if (this.position >= this.maxLength) {
      this.truncate(this.stack, this.maxLength);
    }
    this.position = Math.min(this.position, this.stack.length - 1);

    this.stack = this.stack.slice(0, this.position + 1);

    const index = this.editor.blocks.getCurrentBlockIndex();
    this.stack.push({ index, state });
    this.position += 1;
    this.onUpdate();
  }

  /**
   * Decreases the current position and renders the data in the editor.
   */
  undo() {
    if (this.canUndo()) {
      this.shouldSaveHistory = false;
      const { index, state } = this.stack[(this.position -= 1)];
      if(this.bigBrotherMode) this.viewChanges(this.stack[this.position+1].state, state,'Undo.undo');
      this.onUpdate();

      this.editor.blocks
        .render({ blocks: state })
        .then(() => this.editor.caret.setToBlock(index, 'end'));
    }
  }

  /**
   * Increases the current position and renders the data in the editor.
   */
  redo() {
    if (this.canRedo()) {
      this.shouldSaveHistory = false;
      const { index, state } = this.stack[(this.position += 1)];
      if(this.bigBrotherMode) this.viewChanges(this.stack[this.position-1].state, state,'Undo.redo');
      this.onUpdate();

      this.editor.blocks
        .render({ blocks: state })
        .then(() => this.editor.caret.setToBlock(index, 'end'));
    }
  }

  /**
   * Checks if the history stack can perform an undo action.
   *
   * @returns {Boolean}
   */
  canUndo() {
    return this.position > 0;
  }

  /**
   * Checks if the history stack can perform a redo action.
   *
   * @returns {Boolean}
   */
  canRedo() {
    return this.position < this.count();
  }

  /**
   * Returns the number of changes recorded in the history stack.
   *
   * @returns {Number}
   */
  count() {
    return this.stack.length - 1; // -1 because of initial item
  }

  /**
   * Sets events listeners to allow keyboard actions support.
   */
  setEventListeners() {
    const buttonKey = /(Mac)/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';
    const handleUndo = (e) => {
      if (e[buttonKey] && e.key === 'z') {
        e.preventDefault();
        this.undo();
      }
    };

    const handleRedo = (e) => {
      if (e[buttonKey] && e.key === 'y') {
        e.preventDefault();
        this.redo();
      }
    };

    const handleDestroy = () => {
      document.removeEventListener('keydown', handleUndo);
      document.removeEventListener('keydown', handleRedo);
    };

    document.addEventListener('keydown', handleUndo);
    document.addEventListener('keydown', handleRedo);
    document.addEventListener('destroy', handleDestroy);
  }
}
